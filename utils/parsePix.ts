// utils/parsePix.ts
// Parser simples EMV/TLV para QR Pix (BR Code)
type TLVMap = Record<string, string>;

function readTLV(input: string): TLVMap {
  const map: TLVMap = {};
  let i = 0;
  while (i + 4 <= input.length) {
    const id = input.substring(i, i + 2);
    const len = parseInt(input.substring(i + 2, i + 4), 10);
    if (isNaN(len) || i + 4 + len > input.length) break;
    const value = input.substring(i + 4, i + 4 + len);
    map[id] = value;
    i += 4 + len;
  }
  return map;
}

export type ParsedPix = {
  gui?: string;          // BR.GOV.BCB.PIX
  chave?: string;        // chave Pix (telefone, email, aleatória, cpf/cnpj)
  nome?: string;         // recebedor
  cidade?: string;
  valor?: string;        // "10.00"
  txid?: string;         // identificador (adicional 62/05)
};

export function parsePix(data: string): ParsedPix {
  const emv = readTLV(data);

  // Procura Merchant Account Information entre 26..51
  let merchant: TLVMap | undefined;
  let firstMAI: TLVMap | undefined;

  for (let tag = 26; tag <= 51; tag++) {
    const k = String(tag).padStart(2, "0");
    if (emv[k]) {
      const sub = readTLV(emv[k]);
      if (!firstMAI) firstMAI = sub;
      // GUI "BR.GOV.BCB.PIX"
      if (sub["00"] && sub["00"].includes("BR.GOV.BCB.PIX")) {
        merchant = sub;
        break;
      }
    }
  }
  if (!merchant) merchant = firstMAI ?? {};

  // Campo adicional 62 (onde costuma estar o TxId em 62/05)
  const addData = emv["62"] ? readTLV(emv["62"]) : {};

  return {
    gui: merchant["00"] || "",
    chave: merchant["01"] || merchant["25"] || "",
    nome: emv["59"] || "",
    cidade: emv["60"] || "",
    valor: emv["54"] || "",
    txid: addData["05"] || "",
  };
}
