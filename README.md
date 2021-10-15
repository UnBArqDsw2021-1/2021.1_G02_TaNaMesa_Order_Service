# 2021.1_G02_TaNaMesa_docs

Repositório para o serviço de **Order** do projeto da disciplina de Desenho e Arquitetura de Software do grupo Tá na Mesa (Grupo 02) .

# Tá na Mesa

**Código da Disciplina**: FGA0208<br>
**Número do Grupo**: 02<br>

## Alunos
|Matrícula    | Aluno                              | GitHub                                                     |
| ----------  | ---------------------------------- | ---------------------------------------------------------- |
| 19/0041871  | Abner Filipe Cunha Ribeiro         | [@abner423](https://github.com/abner423)                  |
| 18/0041444  | Brenda Vitória dos Santos          | [@brendavsantos](https://github.com/brendavsantos)         |
| 18/0063162  | Daniel Primo de Melo               | [@danieldagerom](https://github.com/danieldagerom)         |
| 17/0161897  | Eduarda Servidio Claudino          | [@ServidioEC](https://github.com/ServidioEC)               |
| 18/0015966  | Emily Dias Sousa                   | [@emysdias](https://github.com/emysdias)                   |
| 18/0033034  | Hérick Ferreira de Souza Portugues | [@herickport](https://github.com/herickport)               |
| 18/0113666  | Ítalo Alves Guimarães              | [@alvesitalo](https://github.com/alvesitalo)               |
| 18/0114093  | Lucas Ursulino Boaventura          | [@lboaventura25](https://github.com/lboaventura25)         |
| 18/0037439  | Sergio de Almeida Cipriano Júnior  | [@sergiosacj](https://github.com/sergiosacj)               |
| 18/0114689  | Tiago Samuel Rodrigues             | [@tsrrodrigues](https://github.com/tsrrodrigues)           |

## Sobre 🍔
Um sistema para que as pessoas possam chegar no restaurante fazer seus pedidos separados por pessoa e que facilite para daber o valor que cada um vai pagar ao final. 

## Descritivo dos Principais Aspectos Técnicos 

**Principal(is) Metodologia(s) Adotada(s)**: Kanban, XP, Scrum<br>
**Principais Linguagens Utilizadas e/ou Pretendidas**: Typescript<br>
**Principais Tecnologias Utilizadas e/ou Pretendidas**: Docker, Heroku, Node.js, PostgreSQL<br>
**Principal(is) Estilo(s) Arquitetural(is) Adotado(s)**: Monilítico/Microsserviços<br>

## O Projeto está rodando?

(X) SIM
( ) NÃO<br>
Se SIM, insira um manual (ou um script) para auxiliar ainda mais os interessados em consultar o projeto.

## Informações Complementares 

Quaisquer outras informações sobre seu projeto podem ser descritas nessa seção.

## Ambientes
### Local
**[Disponível na porta 3333.](http://localhost:3333/)**

### Ambiente de produção
**[Disponível no Heroku](https://tanamesa-dev-dsw.herokuapp.com)**

***
## Colocando no ar localmente


1. Build
```shell
    make build
```
2. Executar
```shell
    make run
```
2.1 Executar em background
```shell
    make run-silent
```
2.2 Buildar e executar
```shell
    make run-build
```
3. Desativar o container
```shell
    make down
```

## Rodando os testes

```shell
    make test
```

## Cobertura de testes
```shell
    make cov
```

## Acessando o banco de dados 

```shell
    make check-db
```
