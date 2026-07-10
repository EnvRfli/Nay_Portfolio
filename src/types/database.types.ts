export interface Project {
  id: string;
  title: string;
  description: string;
  image_url: string;
  company_name?: string;
  pills?: string[];
  font_family?: string;
  main_colors?: string[];
  wide_images?: string[];
  created_at: string;
}

export interface Database {
  public: {
    Tables: {
      projects: {
        Row: Project;
        Insert: Omit<Project, 'id' | 'created_at'>;
        Update: Partial<Omit<Project, 'id' | 'created_at'>>;
        Relationships: [];
      }
    }
    Views: {
      [_ in never]: never
    }
    Functions: {
      [_ in never]: never
    }
    Enums: {
      [_ in never]: never
    }
  }
}
