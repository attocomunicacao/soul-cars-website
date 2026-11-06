export const SITE = {
  name: "Soul Cars",
  slogan: "Carros com alma",
  phoneDisplay: "(11) 96595-2083",
  whatsapp: "5511965952083",
  address: "Av. São Miguel, 8999 - Vila Norma, São Paulo - SP, 08070-000",
  mapsQuery: "Av. São Miguel, 8999, Vila Norma, São Paulo - SP, 08070-000",
};

export const whatsappLink = (message: string) =>
  `https://wa.me/${SITE.whatsapp}?text=${encodeURIComponent(message)}`;

export const brl = (n: number) =>
  n.toLocaleString("pt-BR", { style: "currency", currency: "BRL", maximumFractionDigits: 0 });
