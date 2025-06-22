# for element in iterable:
# do something with element

# Iteráveis em Python podem ser: listas, tuplas, strings, dicionários...

# numeros = [1, 2, 3, 4, 5]
# for numero in numeros:
#     if numero % 2 == 0:
#         print(numero)

# Em Python, strings são consideradas iteráveis.
# nome = 'Edilson'
# for letra in nome:
#     print(letra)

# range possui 3 parâmetros: inicio, fim e passo
# start, stop, step
# for numero in range(10, 30, 5):
#     print(numero)

# dicionarios = {'nome': 'Edilson', 'idade': 27}
# mapa atributo x valor
# edilson = {
#     "nome": "Edilson",
#     "idade": 45,
#     "altura": 1.65,
#     "programador": True
# }

# O for da forma abaixo, itera apenas sobre as chaves de um dicionário
# for atributo in edilson:
#     print(atributo)

# Se eu quero acessar apenas os valores, essa é a forma:
# for valor in edilson.values():  # ["Edilson", 45, 1.65, True]
#     print(valor)

# Se eu quero acessar os atributos e os valores, essa é a forma:

# for atributo, valor in edilson.items():  # [("nome", "Edilson"), outros...]
#     print(f"Para o atributo {atributo}, temos o valor {valor}")


# CENÁRIO REAL
transacoes = [150, -200, 300, 50, -80]
saldo_total = 0

print("Processando transações bancárias:")
for transacao in transacoes:
    saldo_total += transacao
    deposito_mensagem = f"Depósito R$ {transacao:.2f} | Saldo parcial: R$ {saldo_total:.2f}"
    saque_mensagem = f"Saque R$ {transacao:.2f} | Saldo parcial: R$ {saldo_total:.2f}"

    if transacao > 0:
        print(deposito_mensagem)
    else:
        print(saque_mensagem)

print(f"Saldo total: R$ {saldo_total:.2f}")
