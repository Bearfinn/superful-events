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
  };
}
export interface AccountConnection {
  type: string;
  username: string;
}

export interface Account {
  address: string;
  account_connections: AccountConnection[];
}

export interface Category {
  id: string;
  name: string;
}

export interface Project {
  id: string;
  slug: string;
  name: string;
  logo_url: string;
  banner_url: string;
  website: string;
  description: string;
  twitter_username: string;
  discord_invite_code: string;
  total_supply: number;
  mint_price: number;
  mint_date: string;
  mint_time: string;
  categories: Category[];
}

export interface DiscordRequirements {
  required: boolean;
  operator: string;
  requirements: Requirement[];
}

export interface Requirement {
  exclude_role_operator: string;
  exclude_role_required: boolean;
  exclude_role_requirements: any[];
  role_operator: string;
  role_required: boolean;
  role_requirements: any[];
  server_display_name: string;
  server_id: string;
  server_invite_code: string;
  server_required: string;
}

export interface SuperfulEventFull {
  id: string;
  slug: string;
  name: string;
  liked_count: number;
  status: string;
  type: string;
  raffle_method: string;
  max_entries?: number;
  spots: number;
  start_date: string;
  start_time: string;
  end_date: string;
  end_time: string;
  description: string;
  twitter_follow_required: string;
  wallet_balance_required?: any;
  opensea_slug: string;
  collection_logo: string;
  collection_name: string;
  collection_contract_address: string;
  discord_member_required: boolean;
  discord_server_id: string;
  discord_server_display_name: string;
  discord_server_invite_code: string;
  discord_role_required: boolean;
  discord_role_id: string;
  discord_role_display_name: string;
  confirmation_message: string;
  twitter_requirements: string[];
  discord_exclude_roles_required: boolean;
  exclude_discord_roles: any[];
  discord_roles_requirements: any[];
  event_url: string;
  banner_url: string;
  banner_description: string;
  discord_requirements: DiscordRequirements;
  private_event: boolean;
  liked: boolean;
  joined: boolean;
  mint_address: string;
}

export interface SuperfulEventOverview {
  account: Account;
  project: Project;
  events: SuperfulEventFull[];
}
