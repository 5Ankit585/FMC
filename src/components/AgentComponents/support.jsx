import React, { useState } from 'react';
import "./support.css";


const Support = () => {
  const [tickets, setTickets] = useState([
    { id: 1, user: 'student1@university.com', issue: 'Cannot access course materials', status: 'Open', date: '2025-08-15', details: 'Unable to log in to the course portal.' },
    { id: 2, user: 'staff2@university.com', issue: 'Payment system error', status: 'Open', date: '2025-08-16', details: 'Error processing tuition payment.' },
  ]);
  const [response, setResponse] = useState('');
  const [selectedTicket, setSelectedTicket] = useState(null);

  const handleRespond = (ticketId) => {
    if (response) {
      setTickets(tickets.map(ticket => 
        ticket.id === ticketId ? { ...ticket, status: 'Resolved', response } : ticket
      ));
      setResponse('');
      setSelectedTicket(null);
    }
  };

  const handleViewDetails = (ticketId) => {
    setSelectedTicket(ticketId === selectedTicket ? null : ticketId);
  };

  return (
    <div className="support-container">
      <h2 className="text-2xl font-bold mb-4">Support Tickets</h2>
      <div className="tickets-list">
        {tickets.map((ticket) => (
          <div key={ticket.id} className="ticket-card border p-4 mb-4 rounded">
            <div className="flex justify-between">
              <div>
                <h3 className="text-xl font-semibold">{ticket.issue}</h3>
                <p className="text-sm text-gray-600">From: {ticket.user}</p>
                <p className="text-sm text-gray-600">Date: {ticket.date}</p>
                <p className="text-sm text-gray-600">Status: {ticket.status}</p>
              </div>
              <button
                onClick={() => handleViewDetails(ticket.id)}
                className="bg-blue-500 text-white p-2 rounded hover:bg-blue-600"
              >
                {selectedTicket === ticket.id ? 'Hide Details' : 'View Details'}
              </button>
            </div>
            {selectedTicket === ticket.id && (
              <div className="mt-4">
                <p><strong>Details:</strong> {ticket.details}</p>
                {ticket.status === 'Open' && (
                  <div className="mt-2">
                    <textarea
                      placeholder="Type your response..."
                      value={response}
                      onChange={(e) => setResponse(e.target.value)}
                      className="border p-2 w-full mb-2"
                    ></textarea>
                    <button
                      onClick={() => handleRespond(ticket.id)}
                      className="bg-green-500 text-white p-2 rounded hover:bg-green-600"
                    >
                      Send Response
                    </button>
                  </div>
                )}
                {ticket.response && (
                  <p className="mt-2"><strong>Response:</strong> {ticket.response}</p>
                )}
              </div>
            )}
          </div>
        ))}
      </div>
    </div>
  );
};

export default Support;