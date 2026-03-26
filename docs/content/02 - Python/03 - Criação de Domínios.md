# Criação de Domínios em Python

Nesta aula, o foco é **gerar PDDL programaticamente**. Em vez de escrever o arquivo inteiro manualmente, você vai construir strings de forma controlada, com pequenos “blocos” reutilizáveis.

O objetivo não é substituir seu entendimento de PDDL, e sim:
- reduzir erros de digitação e inconsistência
- padronizar formatação
- permitir criar variações rápidas (por exemplo, mudar nomes, adicionar ações, alternar tipos)

## Objetivos de aprendizagem
- Montar um domínio PDDL como string em Python.
- Criar funções para gerar `:predicates` e `:action`.
- Validar consistência mínima (nomes presentes, parênteses balanceados).

## Pré-requisitos
- Ter lido: [[02 - Leitura PDDL]].

---

# 1) Princípios para gerar PDDL com segurança

## 1.1) Prefira “blocos” pequenos
Gere cada parte do domínio separadamente e depois componha. Isso evita que uma alteração em uma parte quebre o arquivo inteiro.

## 1.2) Centralize indentação
PDDL é lisp-like. Indentação não muda o significado, mas melhora muito a depuração. Se você padroniza indentação no gerador, seus arquivos ficam estáveis.

---

# 2) Um gerador mínimo de domínio

O exemplo a seguir gera um domínio parecido com o `transporte` do módulo básico (com tipos, predicados e uma ação).

```python
from dataclasses import dataclass

def indent(text: str, spaces: int) -> str:
    pad = " " * spaces
    return "\n".join(pad + line if line else line for line in text.splitlines())

def sexp(head: str, *body_lines: str) -> str:
    if not body_lines:
        return f"({head})"
    inner = "\n".join(body_lines)
    return f"({head}\n{indent(inner, 2)})"

@dataclass(frozen=True)
class Predicate:
    name: str
    params: str

    def to_pddl(self) -> str:
        return f"({self.name} {self.params})".rstrip()

@dataclass(frozen=True)
class Action:
    name: str
    parameters: str
    precondition: str
    effect: str

    def to_pddl(self) -> str:
        return sexp(
            f":action {self.name}",
            f":parameters ({self.parameters})",
            f":precondition {self.precondition}",
            f":effect {self.effect}",
        )

def domain_pddl(domain_name: str, requirements: list[str], types: list[str], predicates: list[Predicate], actions: list[Action]) -> str:
    req = sexp(":requirements " + " ".join(requirements))
    typ = sexp(":types " + " ".join(types))
    preds = sexp(":predicates", *(p.to_pddl() for p in predicates))
    body = "\n".join([req, typ, preds] + [a.to_pddl() for a in actions])
    return sexp(f"define (domain {domain_name})", body)

preds = [
    Predicate("em", "?a - agente ?l - lugar"),
    Predicate("conectada", "?x - lugar ?y - lugar"),
]

mover = Action(
    name="mover",
    parameters="?a - agente ?de - lugar ?para - lugar",
    precondition="(and (em ?a ?de) (conectada ?de ?para))",
    effect="(and (not (em ?a ?de)) (em ?a ?para))",
)

text = domain_pddl(
    domain_name="transporte",
    requirements=[":strips", ":typing"],
    types=["agente", "lugar"],
    predicates=preds,
    actions=[mover],
)

print(text)
```

# 3) Validações simples do gerador

## 3.1) Parênteses balanceados
Uma checagem simples ajuda a encontrar erros de composição.

```python
def parentheses_balanced(s: str) -> bool:
    count = 0
    for ch in s:
        if ch == "(":
            count += 1
        elif ch == ")":
            count -= 1
            if count < 0:
                return False
    return count == 0

assert parentheses_balanced(text)
```

## 3.2) Presença de blocos essenciais

```python
def must_contain(s: str, token: str) -> None:
    if token not in s:
        raise ValueError(f"Domínio gerado não contém: {token}")

must_contain(text, "(define (domain")
must_contain(text, "(:predicates")
must_contain(text, "(:action mover")
```

# 4) Exercícios

1) Altere o gerador para incluir um terceiro predicado: `(bloqueada ?s - lugar)`.

2) Crie uma segunda ação `bloquear` que torna uma sala bloqueada, usando efeito de adição.

3) Gere dois domínios: um com `:typing` e outro sem tipos. Quais mudanças você precisou fazer?

### Gabarito sugerido
1) Deve adicionar um `Predicate("bloqueada", "?s - lugar")` na lista.  
2) Uma ação com `:effect (bloqueada ?s)` e pré-condição mínima (por exemplo, `(em ?a ?s)` se você quiser restringir).  
3) Sem tipos, você remove `:typing`, remove `:types` e remove as anotações `- tipo` dos parâmetros e predicados.

### <- Aula anterior
[[02 - Leitura PDDL]]

### -> Próxima aula
[[04 - Manipulação de Problemas]]
