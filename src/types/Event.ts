export interface SuperfulEvent {
  id: string;
  slug: string;
  name: string;
  type: string;
  raffle_method: string;
  end_date: string;
  end_time: string;
  description: string;
  spots: number;
  liked_count: number;
  liked: boolean;
  joined: boolean;
  event_url: string;
  banner_url: string;
  banner_description: string;
  project: {
    slug: string;
    name: string;
    logo_url: string;
    banner_url: string;
  }
}