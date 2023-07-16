# Modular Monolithic

Sistema de Pagamento de Tickets para um Show

Esse sistema foi construído usando a arquitetura modular com Redis Pub/Sub. Os módulos se comunicam de maneira assíncrona, o que evita que a aplicação fique travada quando há muitos acessos acontecendo ao mesmo tempo.

O sistema consegue lidar com um grande volume de acessos simultâneos. Isso ocorre porque as mensagens são enviadas e recebidas de forma assíncrona, o que evita bloqueios e melhora o desempenho geral do sistema. 

# Fluxo de Pagamento de Tickets
Quando um cliente compra um ticket, a reserva é feita com o status "PAYMENT_PENDING" (pagamento pendente). Essa reserva garante que o ticket não seja vendido para outro cliente enquanto o pagamento está sendo processado.

Em seguida, um evento é enviado ao módulo de pagamento para processar o pagamento de forma assíncrona. Esse evento contém as informações relevantes da compra, como o ID do ticket e o valor a ser pago.

