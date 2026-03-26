# Manipulação de Problemas em Python

Nesta aula, o foco é gerar e variar **instâncias de problema** (`problem.pddl`) de forma programática. Na prática, é aqui que Python mais “paga” o investimento: um domínio pode ser fixo, mas os problemas mudam o tempo todo.

## Objetivos de aprendizagem
- Gerar arquivos de problema a partir de parâmetros.
- Criar várias instâncias (lote) para um mesmo domínio.
- Implementar validações simples antes de rodar o planner.

## Pré-requisitos
- Ter lido: [[03 - Criação de Domínios]].

---

# 1) Estrutura do problema (o que vamos gerar)
Um problema costuma ter:
- `(:domain ...)`
- `(:objects ...)`
- `(:init ...)`
- `(:goal ...)`

Nesta aula, vamos usar um exemplo de “transporte” com lugares conectados.

# 2) Gerando um problema com parâmetros

## 2.1) Um gerador mínimo

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
class TransportProblem:
    name: str
    agent: str
    places: list[str]
    edges: list[tuple[str, str]]
    start: str
    goal: str

    def to_pddl(self) -> str:
        objects_lines = [
            f"{self.agent} - agente",
            f"{' '.join(self.places)} - lugar",
        ]
        init_lines = [f"(em {self.agent} {self.start})"] + [f"(conectada {a} {b})" for a, b in self.edges]
        return "\n".join(
            [
                sexp(
                    f"define (problem {self.name})",
                    sexp(":domain transporte"),
                    sexp(":objects", *objects_lines),
                    sexp(":init", *init_lines),
                    sexp(":goal", f"(em {self.agent} {self.goal})"),
                )
            ]
        )

p = TransportProblem(
    name="ir-de-a-para-c",
    agent="robo",
    places=["A", "B", "C"],
    edges=[("A", "B"), ("B", "C")],
    start="A",
    goal="C",
)

print(p.to_pddl())
```

## 2.2) Validações antes de gerar

```python
def validate(problem: TransportProblem) -> None:
    places = set(problem.places)
    if problem.start not in places:
        raise ValueError("Start deve estar em places.")
    if problem.goal not in places:
        raise ValueError("Goal deve estar em places.")
    for a, b in problem.edges:
        if a not in places or b not in places:
            raise ValueError("Aresta referencia lugar inexistente.")

validate(p)
```

# 3) Gerando um lote de problemas (variações)

Um padrão muito comum é gerar problemas parametrizados (por exemplo, cadeia com N lugares):

```python
def chain_problem(n: int) -> TransportProblem:
    if n < 2:
        raise ValueError("n deve ser >= 2")
    places = [f"P{i}" for i in range(n)]
    edges = [(places[i], places[i + 1]) for i in range(n - 1)]
    return TransportProblem(
        name=f"chain-{n}",
        agent="robo",
        places=places,
        edges=edges,
        start=places[0],
        goal=places[-1],
    )

for n in [3, 5, 10]:
    pr = chain_problem(n)
    print(pr.name, len(pr.places), len(pr.edges))
```

# 4) Salvando problemas em arquivos

```python
from pathlib import Path

def write_problem(problem: TransportProblem, out_dir: str) -> Path:
    p = Path(out_dir)
    p.mkdir(parents=True, exist_ok=True)
    file_path = p / f"{problem.name}.pddl"
    file_path.write_text(problem.to_pddl(), encoding="utf-8")
    return file_path

write_problem(chain_problem(5), "problems")
```

# 5) Exercícios

1) Gere um problema com 6 lugares em cadeia e salve em `problems/`.

2) Adapte o gerador para criar um problema com conexões bidirecionais (se existe A->B, também existe B->A).

3) Adicione uma validação para impedir que o problema tenha arestas duplicadas.

### Gabarito sugerido (autoavaliação)
1) Espera-se um `chain_problem(6)` e `write_problem(..., "problems")`.  
2) Ao criar `edges`, adicione também o reverso `(b, a)` para cada `(a, b)` ou gere ambos diretamente.  
3) Use um `set` de arestas normalizadas e verifique repetição antes de aceitar.

### <- Aula anterior
[[03 - Criação de Domínios]]

### -> Próxima aula
[[05 - Integração com Planner]]
