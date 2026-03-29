# Projeto 03: Logística (Cadeia de Suprimentos)

Neste projeto, você modelará um sistema de logística que envolve **vários tipos de veículos**, **múltiplas cidades** e a **entrega de pacotes**.

## Objetivos de Aprendizagem
- Modelar domínios complexos com hierarquias de objetos usando `:typing`.
- Entender como diferentes ações interagem entre si (carregar, descarregar, mover).
- Planejar entregas com múltiplos recursos.

---

## 1) O Cenário
- O mundo tem **cidades**, cada uma com **localizações** (ex.: aeroporto, agência).
- Existem **pacotes** que devem ser entregues de uma localização a outra.
- **Caminhões** podem se mover entre localizações dentro de uma mesma cidade.
- **Aviões** podem voar entre aeroportos de cidades diferentes.

## 2) Tipos de Objetos (`:typing`)
Este projeto é ideal para usar a estrutura de tipos que aprendemos em [Tipos](file:///e:/02_CODES/PPDL/PDDL-Tutorial-pt-br/docs/content/01%20-%20PDDL/08%20-%20Tipos.md):
- `truck, airplane - vehicle`
- `package`
- `location`
- `airport - location`
- `city`

## 3) Ações Principais
Você precisará de ações como:
1. **load-truck**: Carregar um pacote em um caminhão.
2. **unload-truck**: Descarregar um pacote de um caminhão.
3. **drive-truck**: Mover um caminhão entre duas localizações da mesma cidade.
4. **fly-airplane**: Mover um avião entre dois aeroportos.
5. (Repetir o mesmo para aviões: `load-plane`, `unload-plane`).

### Exemplo de Ação `drive-truck`
```lisp
(:action drive-truck
  :parameters (?t - truck ?from ?to - location ?c - city)
  :precondition (and (at ?t ?from) (in-city ?from ?c) (in-city ?to ?c))
  :effect (and (not (at ?t ?from)) (at ?t ?to)))
```

---

## Desafio Prático
Crie um domínio e um problema para o seguinte cenário:
- Um pacote está em `AEROPORTO-A` (Cidade A).
- O pacote deve ser entregue em `AGENCIA-B` (Cidade B).
- Um caminhão está em `AGENCIA-B`.
- Um avião está em `AEROPORTO-A`.

**Questão**: Qual é o plano mínimo? Quantas ações de `load` e `unload` são necessárias?

---

### Próximo Projeto
[[04 - Projeto Final]]
