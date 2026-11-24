import SupportMessage from "../models/SupportMessage.js";
import SupportTicket from "../models/SupportTicket.js";

export async function createTicket(req, res) {
  try {
    const { subject, category, description } = req.body;
    
    const ticket = await SupportTicket.create({
      user: req.user.id,
      subject,
      category,
      description,
    });

    return res.status(201).json({
      success: true,
      message: "Support ticket created successfully",
      ticket,
    });
  } catch (error) {
    console.error("Create ticket error:", error);

    return res.status(500).json({
      success: false,
      message: "Internal server error",
    });
  }
}
export const sendMessage = async (req, res) => {
  try {
    const { ticketId } = req.params;
    const { message } = req.body;

    if (!message?.trim()) {
      return res.status(400).json({
        success: false,
        message: "Message cannot be empty",
      });
    }

    // Find the ticket
    const ticket = await SupportTicket.findById(ticketId);

    if (!ticket) {
      return res.status(404).json({
        success: false,
        message: "Support ticket not found",
      });
    }

    const isAdmin = req.user.role === "admin";

    // Users can only respond to their own tickets
    if (!isAdmin && ticket.user.toString() !== req.user.userId) {
      return res.status(403).json({
        success: false,
        message: "You cannot access this ticket",
      });
    }

    if (ticket.status === "closed") {
      return res.status(400).json({
        success: false,
        message: "This ticket is closed",
      });
    }

    const newMessage = await SupportMessage.create({
      ticket: ticketId,
      sender: req.user.id,
      senderRole: isAdmin ? "support" : "user",
      message,
    });

    // Update ticket status when support responds
    if (isAdmin && ticket.status === "open") {
      ticket.status = "in_progress";
      await ticket.save();
    }

    return res.status(201).json({
      success: true,
      message: "Message sent successfully",
      data: newMessage,
    });
  } catch (error) {
    console.error("Send support message error:", error);

    return res.status(500).json({
      success: false,
      message: "Internal server error",
    });
  }
};
export const getTicketMessages = async (req, res) => {
  try {
    const { ticketId } = req.params;

    const ticket = await SupportTicket.findById(ticketId);

    if (!ticket) {
      return res.status(404).json({
        success: false,
        message: "Support ticket not found",
      });
    }
    
    const isAdmin = req.user.role === "admin";

    if (!isAdmin && ticket.user.toString() !== req.user.id) {
      return res.status(403).json({
        success: false,
        message: "You cannot access this ticket",
      });
    }

    const messages = await SupportMessage.find({
      ticket: ticketId,
    })
      .populate("sender", "username email role")
      .sort({ createdAt: 1 });

    return res.status(200).json({
      success: true,
      messages,
    });
  } catch (error) {
    console.error("Get ticket messages error:", error);

    return res.status(500).json({
      success: false,
      message: "Internal server error",
    });
  }
};
export async function ticketHistory(req, res) {
  try {
    console.log("Authenticated user:", req.user);

    const tickets = await SupportTicket.find({
      user: req.user.id,
    }).sort({ createdAt: -1 });

    console.log("User ID:", req.user.id);
    console.log("Tickets found:", tickets);

    return res.status(200).json({
      success: true,
      count: tickets.length,
      tickets,
    });
  } catch (error) {
    console.error("Ticket history error:", error);

    return res.status(500).json({
      success: false,
      message: "Unable to retrieve support ticket history",
    });
  }
}
export async function getAllTickets(req, res) {
  try {
    const tickets = await SupportTicket.find()
      .populate("user", "username email")
      .sort({ createdAt: -1 });

    return res.status(200).json({
      success: true,
      count: tickets.length,
      tickets,
    });
  } catch (error) {
    console.error("Get all support tickets error:", error);

    return res.status(500).json({
      success: false,
      message: "Unable to retrieve support tickets",
    });
  }
}