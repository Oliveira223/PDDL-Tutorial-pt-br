# Runner real (Fast Downward e alternativas) — por etapas

Você já tem um “runner genérico” (aula `05`) que aceita domínio/problema e devolve stdout/stderr. Nesta aula, você vai transformar isso em um runner prático para um planner real, mantendo o curso genérico e adaptável.

A estratégia didática é construir por camadas:
1) runner que executa um comando fixo
2) runner que recebe caminhos e flags
3) runner que também localiza o arquivo do plano quando o planner salva em disco

## Objetivos de aprendizagem
- Adaptar o pipeline de integração para um planner real via `subprocess`.
- Controlar `cwd`, timeout e captura de logs de forma reproduzível.
- Estruturar “adaptadores” para trocar de planner com mínimo impacto.

## Pré-requisitos
- Ter lido: [[05 - Integração com Planner]].
- Ter concluído: [[06 - Ambiente para Planners Locais]].

---

# 1) Um runner “real” mínimo (comando fixo)

Comece com o menor passo possível: um comando que roda e gera logs.

```python
from pathlib import Path
import subprocess
from dataclasses import dataclass

@dataclass(frozen=True)
class CommandResult:
    returncode: int
    stdout: str
    stderr: str

def run_command(args: list[str], cwd: str | None = None, timeout_s: int | None = None) -> CommandResult:
    completed = subprocess.run(
        args,
        cwd=cwd,
        capture_output=True,
        text=True,
        timeout=timeout_s,
    )
    return CommandResult(
        returncode=completed.returncode,
        stdout=completed.stdout,
        stderr=completed.stderr,
    )

result = run_command(["planner", "--help"])
print(result.returncode)
```

Se isso falhar, pare aqui e corrija o ambiente (aula anterior).

---

# 2) Runner parametrizado por domínio/problema

Agora crie uma função que recebe caminhos e monta o comando.

```python
from pathlib import Path

def make_fast_downward_runner(planner_path: str, search: str):
    def runner(domain_path: Path, problem_path: Path) -> CommandResult:
        args = [
            planner_path,
            str(domain_path),
            str(problem_path),
            "--search",
            search,
        ]
        return run_command(args, cwd=str(domain_path.parent), timeout_s=60)
    return runner

runner = make_fast_downward_runner("./fast-downward.py", 'astar(lmcut())')
```

Observações:
- `cwd` é importante para o planner “enxergar” arquivos gerados (como plano).
- `timeout_s` evita travar o pipeline.

Se você não usa Fast Downward, a mesma ideia vale: troque o comando e as flags, mantenha a assinatura do runner.

---

# 3) Como lidar com plano em arquivo

Alguns planners salvam o plano em arquivo no diretório de execução. Uma estratégia simples é:
- executar o planner dentro de uma pasta de run (uma pasta por execução)
- depois procurar arquivos de plano gerados

Exemplo de utilitário genérico:

```python
from pathlib import Path

def find_plan_files(folder: Path) -> list[Path]:
    candidates = []
    for name in ["sas_plan", "plan.txt", "output.plan"]:
        p = folder / name
        if p.exists():
            candidates.append(p)
    candidates.extend(sorted(folder.glob("*.plan")))
    candidates.extend(sorted(folder.glob("*plan*")))
    return candidates
```

Um pipeline robusto é:
1) criar `runs/<id>/`
2) copiar `domain.pddl` e `problem.pddl` para lá
3) rodar o planner com `cwd=runs/<id>/`
4) salvar `stdout.txt`/`stderr.txt`
5) procurar e copiar/renomear o plano encontrado para `plan.txt`

---

# 4) Alternativas ao Fast Downward (sem mudar o curso)

Como a integração é via linha de comando, você pode usar:
- planners locais diferentes (desde que aceitem domínio/problema)
- wrappers/containers que exponham um comando

A recomendação didática é sempre a mesma:
- comece com uma instância pequena
- salve stdout/stderr
- confirme onde o plano aparece

---

# 5) Exercícios

1) Escreva uma função `make_runner(...)` para o seu planner (real), seguindo a assinatura:
`runner(domain_path: Path, problem_path: Path) -> CommandResult`.

2) Modifique seu pipeline para criar uma pasta por execução e rodar o planner dentro dela (mudando o `cwd`).

3) Implemente `find_plan_files` e explique por que você não deve depender apenas do stdout.

### Gabarito sugerido
1) Espera-se uma função que monte `args` e chame `run_command` com `cwd` e `timeout_s`.  
2) Espera-se `runs/<problem>-<timestamp>/` e logs por execução.  
3) Porque a forma de saída varia por planner; planos podem ser salvos em arquivo e o stdout pode conter logs misturados.

### <- Aula anterior
[[06 - Ambiente para Planners Locais]]

### -> Próxima aula
[[08 - Parsing e validação de planos]]
