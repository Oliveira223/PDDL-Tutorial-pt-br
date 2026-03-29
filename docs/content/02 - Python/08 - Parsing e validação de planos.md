# Parsing e validação de planos (do texto para algo utilizável)

Depois de rodar um planner, você tem um plano em texto (stdout ou arquivo). O passo seguinte é transformar esse texto em algo que seu script consiga:
- listar e imprimir de forma limpa
- comparar entre execuções
- validar minimamente (estrutura e consistência)

O objetivo aqui não é “verificar a correção formal do plano” (isso exigiria simulação completa), e sim fazer uma validação pragmática:
- o plano tem linhas de ações plausíveis?
- a saída não está vazia ou truncada?
- você consegue extrair nomes de ações e argumentos?

## Objetivos de aprendizagem
- Normalizar linhas de plano e remover ruídos comuns (números, parênteses, timestamps).
- Extrair ações e argumentos como uma estrutura simples.
- Fazer validações úteis sem escrever um validador completo.

## Pré-requisitos
- Ter lido: [[05 - Integração com Planner]].
- Recomendado: [[02 - Leitura PDDL]] (para extrações simples do domínio).

---

# 1) Formatos comuns de saída de plano

Você pode encontrar planos como:

1) Uma ação por linha:
- `move a b`
- `pick block1`

2) Com índices:
- `0: (move a b)`
- `1: (pick block1)`

3) Com tempo (em planners temporais):
- `12.000: (navigate u1 A B) [5.000]`

A boa notícia é que dá para extrair o essencial com normalização cuidadosa.

---

# 2) Normalização mínima de linhas

```python
import re

def normalize_plan_line(line: str) -> str | None:
    s = line.strip()
    if not s:
        return None

    s = re.sub(r"^\d+(\.\d+)?\s*:\s*", "", s)
    s = re.sub(r"^\d+\s*[\.\)]\s*", "", s)
    s = s.strip()

    if s.startswith(";"):
        return None

    s = s.strip()
    if s.startswith("(") and s.endswith(")"):
        s = s[1:-1].strip()

    s = re.sub(r"\[[^\]]*\]\s*$", "", s).strip()
    return s or None
```

Essa função é conservadora: ela tenta remover padrões comuns, mas não “adivinha” formatos arbitrários.

---

# 3) Parse simples: ação + argumentos

```python
from dataclasses import dataclass

@dataclass(frozen=True)
class PlanAction:
    name: str
    args: list[str]

def parse_plan_actions(plan_text: str) -> list[PlanAction]:
    actions: list[PlanAction] = []
    for raw in plan_text.splitlines():
        line = normalize_plan_line(raw)
        if not line:
            continue
        parts = line.split()
        if not parts:
            continue
        actions.append(PlanAction(name=parts[0], args=parts[1:]))
    return actions
```

---

# 4) Validações pragmáticas (o que costuma evitar bugs)

## 4.1) Plano vazio ou curto demais

```python
def ensure_non_empty(actions: list[PlanAction]) -> None:
    if not actions:
        raise ValueError("Plano vazio após parsing. Verifique stdout/arquivo de plano.")
```

## 4.2) “Plano contém lixo”
Se o stdout do planner mistura estatísticas com plano, linhas como `Search time:` podem aparecer.  
Uma validação útil é rejeitar linhas que não parecem ações:

```python
def looks_like_action_name(name: str) -> bool:
    return bool(re.fullmatch(r"[a-zA-Z_][a-zA-Z0-9_\-]*", name))

def filter_action_lines(actions: list[PlanAction]) -> list[PlanAction]:
    return [a for a in actions if looks_like_action_name(a.name)]
```

## 4.3) Validação com base no domínio (sem parser completo)
Você pode extrair nomes de ações do domínio por regex (modo simples) e comparar:

```python
def extract_action_names(domain_pddl: str) -> set[str]:
    return set(re.findall(r"\(:action\s+([^\s\)]+)", domain_pddl, flags=re.IGNORECASE))

def validate_actions_exist(actions: list[PlanAction], domain_action_names: set[str]) -> None:
    unknown = {a.name for a in actions if a.name not in domain_action_names}
    if unknown:
        raise ValueError(f"Plano contém ações não reconhecidas no domínio: {sorted(unknown)}")
```

Limitação: isso não valida aridade nem pré-condições; ainda assim, já captura erros comuns de parsing/extração.

---

# 5) Exercícios

1) Copie um plano do stdout do seu planner (ou um arquivo de plano) e aplique `parse_plan_actions`.  
Imprima as 5 primeiras ações como `(nome, args)`.

2) Adicione a validação `validate_actions_exist` usando `extract_action_names(domain_text)`.

3) Você está lidando com planos temporais com duração no final (ex.: `[5.000]`).  
Explique por que a normalização remove esse trecho.

### Gabarito sugerido
1) Espera-se uma lista de `PlanAction` com nome e argumentos em listas.  
2) Espera-se rejeitar ações desconhecidas e apontar quais nomes falharam.  
3) Porque duração é metadado do plano (não é parte do nome/argumentos da ação) e atrapalha parsing por `split()`.

---

### 🚀 Prática Recomendada
Antes de seguir para o próximo módulo, consolide o que aprendeu com:
- **[[exercicios/03 - Desafios]]** (especialmente o Desafio 3, focado em automação com Python).

### 🚀 Desafio de Projeto
Você agora sabe gerar problemas e capturar planos com Python. É a hora de testar no:
- **[[04 - Projetos/02 - Grid Navegação]]**
Neste projeto, você automatizará a criação de grids (grades) complexas usando scripts.

### <- Aula anterior
[[07 - Runner real (Fast Downward e alternativas)]]

### -> Próxima aula
Retome em `03 - Planners` para entender busca, heurísticas e metodologia de debug.
