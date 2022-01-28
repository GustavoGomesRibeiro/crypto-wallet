export interface Altcoins {
  data: [
    {
      id: string;
      symbol: string;
      name: string;
      image: {
        thumb: string;
      };
    },
    {
      market_data: {
        current_price: {
          brl: number;
        };
        price_change_percentage_24h: {
          brl: number;
        };
      };
    },
  ];
  success?: boolean;
  id?: string;
  message?: string;
}
