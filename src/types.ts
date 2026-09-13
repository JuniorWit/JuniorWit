export interface ChecklistTask {
  id: string;
  name: string;
  hours: number;
  defaultChecked: boolean;
  category: 'finance' | 'admin' | 'sales' | 'support';
}

export interface StatItem {
  percentage: string;
  title: string;
  subtitle?: string;
  source: string;
}

export interface ComparisonRow {
  category: string;
  fullTime: string;
  agency: string;
  seniorAdvisory: string;
  juniorWit: string;
}

export interface BenefitCard {
  iconName: 'clock' | 'pause' | 'check' | 'shieldCheck';
  title: string;
  description: string;
}

export interface FaqItem {
  id: string;
  question: string;
  answer: string;
  category?: string;
}

export interface VideoPreset {
  id: string;
  label: string;
  url: string;
  poster: string;
}
