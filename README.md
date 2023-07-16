# Modular-monolithic

Sistema de Pagamento de Tickets para um Show

## Descrição:
Você foi contratado para desenvolver um sistema de pagamento de tickets online para um show que vai acontecer em breve. O desafio consiste em implementar a lógica do sistema de pagamento, levando em consideração que várias pessoas podem tentar comprar os tickets simultaneamente.

Requisitos do sistema:

O sistema deve ser capaz de lidar com várias solicitações de compra de tickets simultaneamente, garantindo que cada solicitação seja processada corretamente.

Cada ticket possui um valor definido, que deve ser levado em consideração no cálculo do pagamento.

O sistema deve verificar se o ticket está disponível para venda antes de processar o pagamento. Caso contrário, a compra não deve ser concluída.

O sistema deve garantir que apenas um ticket seja vendido por transação. Ou seja, se uma pessoa desejar comprar mais de um ticket, várias transações separadas devem ser realizadas.

O sistema deve atualizar o estoque de tickets disponíveis após cada compra bem-sucedida.

É necessário implementar um mecanismo de segurança para evitar compras duplicadas ou fraudulentas.

O sistema deve fornecer uma confirmação de compra para o usuário, contendo os detalhes da transação, como número do ticket, valor, data e hora da compra.

É importante garantir a integridade dos dados e a consistência das transações em caso de falhas no sistema ou interrupções de rede.
