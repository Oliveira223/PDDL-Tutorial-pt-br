# Integração com Planner (Python)

Nesta aula, você vai aprender a integrar Python com um planner, com foco em um fluxo simples e reutilizável:
1) ter um domínio (`domain.pddl`)
2) gerar ou selecionar um problema (`problem.pddl`)
3) executar o planner a partir do Python
4) capturar a saída e registrar o plano

Como planners variam muito (e nem todos rodam nativamente no Windows), esta aula foca em um padrão que funciona bem em qualquer ambiente:
- chamar um comando externo via `subprocess`
- tratar a saída como texto
- registrar resultados em arquivos

## Objetivos de aprendizagem
- Executar um planner via `subprocess.run`.
- Capturar stdout/stderr e tratar falhas de execução.
- Organizar entradas/saídas em pastas (`problems/`, `plans/`, `runs/`).
- Criar um “runner” simples para rodar várias instâncias.

## Pré-requisitos
- Ter lido: [[04 - Manipulação de Problemas]].

---

# 1) O que significa “integrar com planner”

No contexto deste curso, integrar significa que seu script:
- recebe caminhos de domínio e problema
- chama um executável/command line que aceita esses arquivos
- captura o plano (se existir)
- salva logs para depuração

O formato do comando depende do planner. Por isso, a integração deve ser feita com uma função “adaptável”.

# 2) Executando um comando externo com Python

```python
from dataclasses import dataclass
from pathlib import Path
import subprocess

@dataclass(frozen=True)
class CommandResult:
    returncode: int
    stdout: str
    stderr: str

def run_command(args: list[str], cwd: str | None = None) -> CommandResult:
    completed = subprocess.run(
        args,
        cwd=cwd,
        capture_output=True,
        text=True,
    )
    return CommandResult(
        returncode=completed.returncode,
        stdout=completed.stdout,
        stderr=completed.stderr,
    )
```

## 2.1) Tratando erros de execução

```python
def ensure_ok(result: CommandResult) -> None:
    if result.returncode != 0:
        msg = result.stderr.strip() or result.stdout.strip() or "Falha sem mensagem."
        raise RuntimeError(msg)
```

# 3) Um “runner” genérico de planner

Como cada planner tem uma forma diferente de chamar, vamos modelar a chamada como uma função que recebe caminhos e devolve texto de saída.

```python
from typing import Protocol

class PlannerRunner(Protocol):
    def __call__(self, domain_path: Path, problem_path: Path) -> CommandResult: ...
```

Exemplo de runner “falso” (para testar pipeline sem planner instalado):

```python
def dummy_runner(domain_path: Path, problem_path: Path) -> CommandResult:
    return CommandResult(
        returncode=0,
        stdout=f"PLAN\n(dummy) domain={domain_path.name} problem={problem_path.name}\n",
        stderr="",
    )
```

# 4) Pipeline: rodar e salvar resultados

```python
from datetime import datetime

def run_and_save(
    runner: PlannerRunner,
    domain_path: str,
    problem_path: str,
    out_dir: str = "runs",
) -> Path:
    out = Path(out_dir)
    out.mkdir(parents=True, exist_ok=True)

    domain = Path(domain_path)
    problem = Path(problem_path)

    stamp = datetime.now().strftime("%Y%m%d-%H%M%S")
    run_folder = out / f"{problem.stem}-{stamp}"
    run_folder.mkdir(parents=True, exist_ok=True)

    result = runner(domain, problem)

    (run_folder / "stdout.txt").write_text(result.stdout, encoding="utf-8")
    (run_folder / "stderr.txt").write_text(result.stderr, encoding="utf-8")
    (run_folder / "returncode.txt").write_text(str(result.returncode), encoding="utf-8")

    return run_folder

folder = run_and_save(dummy_runner, "domain.pddl", "problem.pddl")
print(folder)
```

# 5) Extraindo um “plano” da saída

Planners imprimem planos em formatos diferentes. Um approach simples é:
- salvar a saída sempre
- criar um extrator específico por planner quando necessário

Exemplo de extrator muito simples (linha a linha, ignorando vazios):

```python
def naive_plan_lines(stdout: str) -> list[str]:
    lines = []
    for line in stdout.splitlines():
        line = line.strip()
        if not line:
            continue
        lines.append(line)
    return lines
```

# 6) Rodando vários problemas (lote)

```python
def find_problems(folder: str) -> list[Path]:
    p = Path(folder)
    return sorted(p.glob("*.pddl"))

problems = find_problems("problems")
for pr in problems:
    run_and_save(dummy_runner, "domain.pddl", str(pr), out_dir="runs")
```

# 7) Exercícios

1) Use o pipeline para rodar três problemas gerados na aula anterior e salvar tudo em `runs/`.

2) Modifique `run_and_save` para também copiar o `problem.pddl` para dentro da pasta do run (para rastreabilidade).

3) Especifique como você adaptaria o `runner` para um planner real: quais argumentos o comando precisaria receber?

### Gabarito sugerido
1) Espera-se iterar sobre `problems/*.pddl` e chamar `run_and_save`.  
2) Use `Path.read_text`/`write_text` ou `shutil.copy2` para copiar o arquivo do problema.  
3) Em geral, domínio e problema entram como argumentos do comando; alguns planners exigem flags adicionais e um caminho de saída do plano.

### <- Aula anterior
[[04 - Manipulação de Problemas]]

### -> Próxima aula
Retome em `03 - Planners` para escolher e configurar um planner real.
