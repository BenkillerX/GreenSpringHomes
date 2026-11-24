import {Router} from 'express'
import { createTicket, getTicketMessages, ticketHistory, sendMessage} from './support.controllers.js';
import { authenticateToken } from '../../middleware/auth.middleware.js';
const supportRoutes = Router();
supportRoutes.use(authenticateToken);
supportRoutes.post('/',createTicket)
supportRoutes.get('/ticket-history', ticketHistory)
supportRoutes.post("/:ticketId/messages", sendMessage);
supportRoutes.get("/:ticketId/messages", getTicketMessages);
export default supportRoutes;