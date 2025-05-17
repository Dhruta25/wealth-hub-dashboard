
import { createContext, ReactNode, useContext, useState } from "react";
import { AuthContextType, User, UserRole } from "@/types/auth";
import { useToast } from "@/components/ui/use-toast";

// Create AuthContext
const AuthContext = createContext<AuthContextType | undefined>(undefined);

// Sample user data for demonstration (would be replaced with Supabase Auth)
const mockUsers: Record<string, { password: string, user: User }> = {
  "admin@example.com": {
    password: "password123",
    user: {
      id: "1",
      email: "admin@example.com",
      name: "John Admin",
      role: "top_management",
      profileImageUrl: "https://api.dicebear.com/7.x/avataaars/svg?seed=John"
    }
  },
  "head@example.com": {
    password: "password123",
    user: {
      id: "2",
      email: "head@example.com",
      name: "Jane Head",
      role: "business_head",
      profileImageUrl: "https://api.dicebear.com/7.x/avataaars/svg?seed=Jane"
    }
  },
  "rmhead@example.com": {
    password: "password123",
    user: {
      id: "3",
      email: "rmhead@example.com",
      name: "Chris Manager",
      role: "rm_head",
      profileImageUrl: "https://api.dicebear.com/7.x/avataaars/svg?seed=Chris"
    }
  },
  "rm@example.com": {
    password: "password123",
    user: {
      id: "4",
      email: "rm@example.com",
      name: "Sam RM",
      role: "relationship_manager",
      profileImageUrl: "https://api.dicebear.com/7.x/avataaars/svg?seed=Sam"
    }
  }
};

export const AuthProvider = ({ children }: { children: ReactNode }) => {
  const [user, setUser] = useState<User | null>(null);
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const { toast } = useToast();
  
  // Simulate an auth check on mount
  useState(() => {
    // Check for stored user in localStorage (simulating session persistence)
    const storedUser = localStorage.getItem("crm_user");
    if (storedUser) {
      setUser(JSON.parse(storedUser));
    }
    setIsLoading(false);
  });
  
  // Login function
  const login = async (email: string, password: string) => {
    setIsLoading(true);
    
    try {
      // Simulate API call delay
      await new Promise(resolve => setTimeout(resolve, 1000));
      
      // Mock authentication
      const lowerEmail = email.toLowerCase();
      
      if (mockUsers[lowerEmail] && mockUsers[lowerEmail].password === password) {
        const loggedInUser = mockUsers[lowerEmail].user;
        setUser(loggedInUser);
        localStorage.setItem("crm_user", JSON.stringify(loggedInUser));
        toast({
          title: "Login successful",
          description: `Welcome back, ${loggedInUser.name}!`,
        });
      } else {
        throw new Error("Invalid email or password");
      }
    } catch (error) {
      toast({
        variant: "destructive",
        title: "Login failed",
        description: error instanceof Error ? error.message : "Please check your credentials",
      });
      throw error;
    } finally {
      setIsLoading(false);
    }
  };
  
  // Logout function
  const logout = async () => {
    setIsLoading(true);
    
    try {
      // Simulate API call delay
      await new Promise(resolve => setTimeout(resolve, 500));
      
      setUser(null);
      localStorage.removeItem("crm_user");
      toast({
        title: "Logout successful",
        description: "You have been logged out successfully",
      });
    } catch (error) {
      toast({
        variant: "destructive",
        title: "Logout failed",
        description: "An error occurred during logout",
      });
    } finally {
      setIsLoading(false);
    }
  };
  
  // Forgot password function
  const forgotPassword = async (email: string) => {
    setIsLoading(true);
    
    try {
      // Simulate API call delay
      await new Promise(resolve => setTimeout(resolve, 1000));
      
      // Check if email exists in our mock db
      if (mockUsers[email.toLowerCase()]) {
        toast({
          title: "Password reset link sent",
          description: "Check your email for the reset link",
        });
      } else {
        toast({
          title: "Email sent",
          description: "If an account exists, you'll receive a reset link",
        });
      }
    } catch (error) {
      toast({
        variant: "destructive",
        title: "Request failed",
        description: "Failed to send password reset email",
      });
    } finally {
      setIsLoading(false);
    }
  };
  
  // Reset password function
  const resetPassword = async (password: string, token: string) => {
    setIsLoading(true);
    
    try {
      // Simulate API call delay
      await new Promise(resolve => setTimeout(resolve, 1000));
      
      toast({
        title: "Password reset successful",
        description: "Your password has been updated",
      });
    } catch (error) {
      toast({
        variant: "destructive",
        title: "Reset failed",
        description: "Failed to reset password. Try again or request a new link",
      });
    } finally {
      setIsLoading(false);
    }
  };
  
  return (
    <AuthContext.Provider
      value={{
        user,
        isLoading,
        login,
        logout,
        forgotPassword,
        resetPassword,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  
  if (context === undefined) {
    throw new Error("useAuth must be used within an AuthProvider");
  }
  
  return context;
};
