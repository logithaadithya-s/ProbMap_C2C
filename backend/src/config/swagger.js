import swaggerJSDoc from "swagger-jsdoc";
import { config } from "./index.js";

const options = {
  definition: {
    openapi: "3.0.0",
    info: {
      title: "ProbMap API",
      version: "1.0.0",
      description: "Public Property Damage Reporting Platform API",
      contact: {
        name: "ProbMap Team",
        email: "support@probmap.example.com",
      },
    },
    servers: [
      {
        url: `http://localhost:${config.port}`,
        description: "Development server",
      },
      {
        url: "https://api.probmap.example.com",
        description: "Production server",
      },
    ],
    components: {
      securitySchemes: {
        bearerAuth: {
          type: "http",
          scheme: "bearer",
          bearerFormat: "JWT",
          description: "Firebase ID token",
        },
        cookieAuth: {
          type: "apiKey",
          in: "cookie",
          name: "session",
          description: "Session cookie for admin routes",
        },
      },
      schemas: {
        Issue: {
          type: "object",
          properties: {
            _id: { type: "string" },
            title: { type: "string" },
            description: { type: "string" },
            category: { type: "string" },
            location: {
              type: "object",
              properties: {
                lat: { type: "number" },
                lng: { type: "number" },
              },
            },
            district: { type: "string" },
            importance: { type: "string", enum: ["High", "Medium", "Low"] },
            cost_estimate: { type: "string" },
            is_public_property: { type: "boolean" },
            imageUrl: { type: "string", format: "uri" },
            status: { type: "string", enum: ["pending", "acknowledged", "resolved", "rejected"] },
            userId: { type: "string" },
            createdAt: { type: "string", format: "date-time" },
            updatedAt: { type: "string", format: "date-time" },
            userInfo: { $ref: "#/components/schemas/UserInfo" },
            adminResponse: { $ref: "#/components/schemas/AdminResponse" },
          },
        },
        UserInfo: {
          type: "object",
          properties: {
            fullName: { type: "string" },
            email: { type: "string" },
            phone: { type: "string" },
            joinedDate: { type: "string", format: "date-time" },
          },
        },
        AdminResponse: {
          type: "object",
          properties: {
            message: { type: "string" },
            respondedAt: { type: "string", format: "date-time" },
          },
        },
        AnalysisResult: {
          type: "object",
          properties: {
            category: { type: "string" },
            importance: { type: "string", nullable: true },
            cost_estimate: { type: "string" },
            confidence: { type: "number", minimum: 0, maximum: 1 },
            is_public_property: { type: "boolean" },
          },
        },
        Volunteer: {
          type: "object",
          properties: {
            _id: { type: "string" },
            fullName: { type: "string" },
            email: { type: "string" },
            volunteerDistrict: { type: "string" },
            volunteerPoints: { type: "number" },
            status: { type: "string", enum: ["pending", "approved", "rejected"] },
            createdAt: { type: "string", format: "date-time" },
          },
        },
        Claim: {
          type: "object",
          properties: {
            _id: { type: "string" },
            title: { type: "string" },
            district: { type: "string" },
            volunteerClaim: {
              type: "object",
              properties: {
                submittedAt: { type: "string", format: "date-time" },
                proofImageUrl: { type: "string", format: "uri" },
                status: { type: "string", enum: ["pending", "approved", "rejected"] },
              },
            },
          },
        },
        Error: {
          type: "object",
          properties: {
            error: { type: "string" },
            message: { type: "string" },
          },
        },
      },
    },
    security: [{ bearerAuth: [] }, { cookieAuth: [] }],
    tags: [
      { name: "Issues", description: "Issue management endpoints" },
      { name: "Auth", description: "Authentication endpoints" },
      { name: "Admin", description: "Admin-only endpoints" },
      { name: "Volunteers", description: "Volunteer management" },
      { name: "Reports", description: "Analytics and reporting" },
    ],
  },
  apis: ["./src/routes/*.js", "./src/controllers/*.js"],
};

export const swaggerSpec = swaggerJSDoc(options);