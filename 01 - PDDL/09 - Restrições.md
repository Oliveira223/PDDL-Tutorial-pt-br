# Restrições em PDDL

Em PDDL, **restrições** expressam condições que devem ser respeitadas por qualquer plano válido, mas que nem sempre são convenientes de modelar apenas com pré-condições e efeitos. Elas servem para declarar “regras globais” sobre os estados ou sobre o percurso do plano.

Nesta aula, vamos separar dois sentidos comuns de “restrição”:
- **Restrições por modelagem** (clássicas): regras implementadas com predicados, pré-condições e efeitos.
- **Restrições explícitas da linguagem** (PDDL mais avançado): declaradas em `:constraints` (e, em alguns casos, `:preferences`), quando o planner oferece suporte.

## Objetivos de aprendizagem
- Entender o que é uma restrição e quando ela é útil.
- Diferenciar uma regra local (pré-condição) de uma regra global (restrição).
- Reconhecer a existência de `:constraints` e seus cuidados práticos.

---

# 1) Restrições por modelagem (o essencial)
No planejamento clássico, a forma mais portátil (compatível com mais planners) de impor regras é modelando-as no próprio domínio.

## Exemplo: “não pode atravessar parede”
Você pode impor isso exigindo a condição na pré-condição de `mover`:

```lisp
:precondition (and (em ?a ?de) (conectada ?de ?para))
```

Aqui, a restrição “só move se houver conexão” está embutida como uma condição local de aplicabilidade.

## Exemplo: “o agente só pode estar em um lugar por vez”
Essa restrição costuma ser garantida por efeitos corretos:

```lisp
:effect (and (not (em ?a ?de)) (em ?a ?para))
```

Note que, novamente, não existe um bloco “restrição”; você garante a propriedade global pelo modo como o estado é atualizado.

# 2) Restrições explícitas (`:constraints`) — quando suportado
Algumas extensões de PDDL permitem declarar restrições explicitamente no problema (ou no domínio, dependendo do dialeto). A ideia é dizer ao planner: “mesmo que as ações permitam, o plano só é aceitável se respeitar esta regra global”.

Um esqueleto típico (quando suportado) é:

```lisp
(define (problem ...)
  (:domain ...)
  (:objects ...)
  (:init ...)
  (:goal ...)
  (:constraints
    ...))
```

Importante:
- Nem todo planner suporta `:constraints`. Quando não suporta, isso pode gerar erro de parsing ou ser ignorado.
- Por isso, em cursos introdutórios, a abordagem “por modelagem” costuma ser a principal.

## Intuição: tipos de restrições
Exemplos comuns de restrições globais (dependem do suporte do planner):
- “Sempre”: uma condição deve ser verdadeira em todos os estados do plano.
- “Em algum momento”: uma condição deve ser verdadeira pelo menos uma vez.
- “Até”: uma condição deve permanecer verdadeira até outra acontecer.

Mesmo sem usar `:constraints`, é útil reconhecer o conceito, porque ele explica o tipo de regra que você às vezes tenta “forçar” apenas com `:goal` (e isso costuma dar errado).

# 3) `:goal` não é “restrição de execução”
Um erro comum é tentar usar o objetivo para controlar regras do meio do caminho. O `:goal` apenas define o que deve ser verdadeiro ao final.

Se você precisa impor algo durante o trajeto (por exemplo, “nunca entrar em uma sala proibida”), você deve:
- modelar via pré-condições/efeitos, ou
- usar `:constraints` se o seu planner suportar.

# Armadilhas comuns
- Colocar uma regra global no `:goal` e supor que ela vale “durante todo o plano”.
- Depender de `:constraints` sem verificar se o planner suporta.
- Criar predicados de “controle” (ex.: `(ok)`) sem semântica clara, dificultando depuração.

## Exercícios

1) Você quer impor: “o agente não pode mover para uma sala bloqueada”.  
Você implementaria isso como pré-condição, efeito, goal ou constraint? Explique em uma frase.

2) Você quer impor: “durante todo o plano, a bateria do robô não pode estar vazia”.  
Esse tipo de regra é mais “local” (pré-condição) ou “global” (restrição)? Por quê?

3) Dê um exemplo de uma regra que normalmente não deveria ser implementada no `:goal`.

### Gabarito sugerido
1) Pré-condição (ou constraint, se suportado), pois é uma regra de aplicabilidade do movimento.  
2) Global, pois se refere a todos os estados do percurso, não apenas a um passo específico.  
3) Exemplo: “nunca entrar em sala proibida” (não basta checar só no estado final).

### <- Aula anterior
[[08 - Tipos]]

### -> Próxima aula
[[10 - Exemplo Completo]]
