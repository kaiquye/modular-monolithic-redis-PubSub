interface Input {
  to: string;
  ticketId: string;
  status: string;
}
export async function NotifyReserveTicketProvider(input: Input) {
  return true;
}
