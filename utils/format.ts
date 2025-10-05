export function formatBRL(v: string | number): string {
  const numberValue = typeof v === "string" ? parseFloat(v.replace(",", ".")) : v;
  return `R$ ${numberValue.toLocaleString("pt-BR", { minimumFractionDigits: 2 })}`;
}
