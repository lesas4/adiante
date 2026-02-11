# Sistema de Preço Novo - Leidy Cleaner

## Regra Principal de Horas

**Base:** R$ 40 (começa com 40 reais)
**Adição por hora:** +R$ 20 a cada hora até 8 horas totais
**Taxa após 8h:** +40% sobre o valor

### Cálculo Exemplo:

- **1 hora:** R$ 40
- **2 horas:** R$ 40 + R$ 20 = R$ 60
- **3 horas:** R$ 40 + (R$ 20 × 2) = R$ 80
- **4 horas:** R$ 40 + (R$ 20 × 3) = R$ 100
- **5 horas:** R$ 40 + (R$ 20 × 4) = R$ 120
- **6 horas:** R$ 40 + (R$ 20 × 5) = R$ 140
- **7 horas:** R$ 40 + (R$ 20 × 6) = R$ 160
- **8 horas:** R$ 40 + (R$ 20 × 7) = R$ 180
- **9 horas:** (R$ 180) × 1.4 = R$ 252
- **10 horas:** (R$ 180) × 1.4 + R$ 20 = R$ 272
- **16 horas:** (R$ 180) × 1.4 + (R$ 20 × 8) = R$ 412

## Serviços Extras

**TAXA:** +40% nos extras (EXCETO Levar Produtos)

### Extra 1: Organização
- **Valor:** Preço base × 10%
- **Taxa aplicada:** SIM (+40%)
- **Exemplo:** Se base é R$ 100, extra = R$ 10 + 40% = R$ 14

### Extra 2: Pós-Obra
- **Valor:** Preço base × 30%
- **Taxa aplicada:** SIM (+40%)
- **Exemplo:** Se base é R$ 100, extra = R$ 30 + 40% = R$ 42

### Extra 3: Levar os Produtos
- **Valor:** R$ 30 fixo
- **Taxa aplicada:** NÃO (sem taxa)
- **Exemplo:** Sempre R$ 30

## Múltiplos Agendamentos

**Opção 1:** Pedir vários serviços de uma só vez para vários lugares
**Opção 2:** Pagamento separado para cada local/serviço
**Opção 3:** Pagar tudo junto se quiser

### Exemplo Múltiplos:

Cliente quer:
- 4 horas em casa A
- 3 horas em casa B
- Ambos com organização

**Pagamento Separado:**
- Casa A: R$ 100 + (R$ 100 × 10% × 1.4) = R$ 100 + R$ 14 = R$ 114
- Casa B: R$ 80 + (R$ 80 × 10% × 1.4) = R$ 80 + R$ 11,20 = R$ 91,20
- **Total:** R$ 205,20

**OU Pagamento Junto:**
- Tudo em uma transação: R$ 205,20 (desconto pode ser aplicado?)

## Implementação Técnica

Criar componente:
- `HourPricingCalculator.jsx` - UI interativa
- `calculateHourPrice()` - Lógica de cálculo
- Suportar seleção de extras (checkboxes)
- Botão "Adicionar Outro Local"
- Resumo de múltiplos pagamentos vs pagamento único

