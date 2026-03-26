# Leitura de PDDL em Python

Nesta aula, você vai aprender a **ler arquivos PDDL** com Python, primeiro como texto (abordagem mais robusta para começar) e depois com extrações simples (para obter informações úteis sem depender de bibliotecas externas).

O foco é construir um pipeline prático:
- carregar `domain.pddl` e `problem.pddl`
- verificar se parecem bem formados (estrutura básica)
- extrair itens úteis (nome do domínio, nome do problema, objetivos e alguns predicados)

## Objetivos de aprendizagem
- Ler arquivos `.pddl` em Python com segurança.
- Normalizar texto (remover comentários e espaços) para facilitar análise.
- Extrair informações simples sem implementar um parser completo.

## Pré-requisitos
- Ter lido: [[01 - Visão Python]].

---

# 1) Ler arquivos como texto

PDDL é texto. Antes de “parsear”, o primeiro passo é apenas carregar o conteúdo.

```python
from pathlib import Path

def read_text(path: str) -> str:
    return Path(path).read_text(encoding="utf-8")

domain_text = read_text("domain.pddl")
problem_text = read_text("problem.pddl")

print(len(domain_text), len(problem_text))
```

# 2) Remover comentários e normalizar espaços

Em PDDL, comentários normalmente começam com `;` e vão até o fim da linha. Remover comentários evita que uma palavra “pareça” uma keyword dentro de um comentário.

```python
def strip_comments(pddl: str) -> str:
    lines = []
    for line in pddl.splitlines():
        left = line.split(";", 1)[0]
        lines.append(left)
    return "\n".join(lines)

def normalize_whitespace(pddl: str) -> str:
    return " ".join(pddl.split())

domain_clean = normalize_whitespace(strip_comments(domain_text))
problem_clean = normalize_whitespace(strip_comments(problem_text))
```

Observação: a normalização acima serve para buscas simples. Para mostrar o arquivo ao usuário, mantenha a versão original.

# 3) Extrações simples (sem parser completo)

## 3.1) Encontrar o nome do domínio e do problema

O domínio costuma começar com:
- `(define (domain NOME) ...)`

E o problema com:
- `(define (problem NOME) ...)`

Você pode extrair isso com regex leve:

```python
import re

def extract_domain_name(domain_pddl: str) -> str | None:
    m = re.search(r"\(domain\s+([^\s\)]+)\)", domain_pddl, flags=re.IGNORECASE)
    return m.group(1) if m else None

def extract_problem_name(problem_pddl: str) -> str | None:
    m = re.search(r"\(problem\s+([^\s\)]+)\)", problem_pddl, flags=re.IGNORECASE)
    return m.group(1) if m else None

print(extract_domain_name(domain_clean))
print(extract_problem_name(problem_clean))
```

## 3.2) Encontrar o domínio referenciado pelo problema (`:domain`)

No problema, costuma existir:
- `(:domain NOME)`

```python
def extract_problem_domain(problem_pddl: str) -> str | None:
    m = re.search(r"\(:domain\s+([^\s\)]+)\)", problem_pddl, flags=re.IGNORECASE)
    return m.group(1) if m else None

print(extract_problem_domain(problem_clean))
```

## 3.3) Verificação mínima de compatibilidade

Uma verificação simples que já previne erros comuns:
- o problema deve referenciar o mesmo domínio que o arquivo de domínio declara

```python
domain_name = extract_domain_name(domain_clean)
problem_domain = extract_problem_domain(problem_clean)

if domain_name is None:
    raise ValueError("Não foi possível extrair o nome do domínio.")
if problem_domain is None:
    raise ValueError("Não foi possível extrair (:domain ...) do problema.")
if domain_name != problem_domain:
    raise ValueError(f"Domínio do arquivo ({domain_name}) != domínio do problema ({problem_domain})")
```

# 4) Extraindo fatos do `:init` e condições do `:goal` (modo simples)

Um parser completo de PDDL é um tema grande. Para começar, o que costuma ser suficiente é extrair “blocos” de texto (init/goal) e, dentro deles, identificar expressões do tipo `(pred arg1 arg2)`.

## 4.1) Extrair o bloco `:init`

```python
def extract_init_block(problem_pddl: str) -> str | None:
    m = re.search(r"\(:init\s+(.*?)\)\s*\(:goal", problem_pddl, flags=re.IGNORECASE | re.DOTALL)
    return m.group(1) if m else None

init_block = extract_init_block(problem_text)
print(init_block is not None)
```

Essa abordagem depende da ordem `:init` antes de `:goal` e de uma formatação compatível. Ela é adequada como passo inicial e funciona bem para domínios simples do curso.

## 4.2) Extrair fatos no formato `(nome args...)`

```python
def extract_facts(sexp_block: str) -> list[tuple[str, list[str]]]:
    fact_pattern = re.compile(r"\(([^\s\(\)]+)([^\)]*)\)")
    facts: list[tuple[str, list[str]]] = []
    for m in fact_pattern.finditer(sexp_block):
        name = m.group(1)
        args = [a for a in m.group(2).split() if a]
        if name.lower() in {"and", "not"}:
            continue
        facts.append((name, args))
    return facts

if init_block:
    for name, args in extract_facts(init_block):
        print(name, args)
```

Limitação: isso não lida perfeitamente com expressões aninhadas complexas. Nesta etapa, a intenção é ter algo útil para diagnósticos e pequenos relatórios.

# 5) Exercícios

1) Carregue um `domain.pddl` e um `problem.pddl` do curso e verifique se o `:domain` bate com o `(domain ...)`.

2) Extraia e liste todos os fatos do `:init` do problema do exemplo completo.

3) Proponha uma validação simples adicional que Python pode fazer sem “entender” o PDDL por completo.

### Gabarito sugerido (autoavaliação)
1) Espera-se que você compare o nome do domínio do arquivo com o `:domain` do problema e gere erro quando divergir.  
2) Deve listar fatos como `(em robo A)` e conexões do tipo `(conectada A B)`.  
3) Exemplos: verificar parênteses balanceados; verificar presença de `:init` e `:goal`; verificar que `domain.pddl` e `problem.pddl` existem.

### <- Aula anterior
[[01 - Visão Python]]

### -> Próxima aula
[[03 - Criação de Domínios]]
