const swaggerUi = require('swagger-ui-express');
const swaggerDocument = {
    "openapi": "3.0.0",
  "info": {
    "title": "Music API",
    "description": "API pour gérer les musiques, les utilisateurs, les files d'attente et les rooms.",
    "version": "1.0.0"
  },
  "servers": [
    {
      "url": "http://localhost:3000/api/",
      "description": "Serveur de développement"
    }
  ],
  "paths": {
    "/music": {
      "get": {
        "summary": "Récupère toutes les musiques",
        "responses": {
          "200": {
            "description": "Liste de toutes les musiques",
            "content": {
              "application/json": {
                "schema": {
                  "type": "array",
                  "items": {
                    "$ref": "#/components/schemas/Music"
                  }
                }
              }
            }
          },
          "500": {
            "description": "Erreur serveur interne"
          }
        }
      }
    },
    "/music/{id}": {
      "get": {
        "summary": "Récupère une musique par ID",
        "parameters": [
          {
            "name": "id",
            "in": "path",
            "required": true,
            "schema": {
              "type": "string"
            }
          }
        ],
        "responses": {
          "200": {
            "description": "Musique trouvée",
            "content": {
              "application/json": {
                "schema": {
                  "$ref": "#/components/schemas/Music"
                }
              }
            }
          },
          "404": {
            "description": "Musique non trouvée"
          },
          "500": {
            "description": "Erreur serveur interne"
          }
        }
      },
      "delete": {
        "summary": "Supprime une musique par ID",
        "parameters": [
          {
            "name": "id",
            "in": "path",
            "required": true,
            "schema": {
              "type": "string"
            }
          }
        ],
        "responses": {
          "200": {
            "description": "Musique supprimée"
          },
          "404": {
            "description": "Musique non trouvée"
          },
          "500": {
            "description": "Erreur serveur interne"
          }
        }
      }
    },
    "/oauth/token": {
      "post": {
        "summary": "Authentifie un utilisateur avec un token Firebase",
        "requestBody": {
          "required": true,
          "content": {
            "application/json": {
              "schema": {
                "type": "object",
                "properties": {
                  "firebaseToken": {
                    "type": "string",
                    "example": "abc123"
                  }
                }
              }
            }
          }
        },
        "responses": {
          "200": {
            "description": "Utilisateur authentifié"
          },
          "201": {
            "description": "Utilisateur créé"
          },
          "400": {
            "description": "Token Firebase manquant"
          },
          "500": {
            "description": "Erreur serveur interne"
          }
        }
      }
    },
    "/queues/{roomId}": {
      "get": {
        "summary": "Récupère les musiques d'une file d'attente spécifique",
        "parameters": [
          {
            "name": "roomId",
            "in": "path",
            "required": true,
            "schema": {
              "type": "string"
            }
          }
        ],
        "responses": {
          "200": {
            "description": "Liste des musiques de la file d'attente",
            "content": {
              "application/json": {
                "schema": {
                  "type": "array",
                  "items": {
                    "$ref": "#/components/schemas/Music"
                  }
                }
              }
            }
          },
          "404": {
            "description": "File d'attente non trouvée"
          },
          "500": {
            "description": "Erreur serveur interne"
          }
        }
      }
    },
    "/queues/{roomId}/musics": {
      "post": {
        "summary": "Ajoute une musique à une file d'attente",
        "parameters": [
          {
            "name": "roomId",
            "in": "path",
            "required": true,
            "schema": {
              "type": "string"
            }
          }
        ],
        "requestBody": {
          "required": true,
          "content": {
            "application/json": {
              "schema": {
                "type": "object",
                "properties": {
                  "url": {
                    "type": "string",
                    "example": "https://example.com/music.mp3"
                  },
                  "title": {
                    "type": "string",
                    "example": "Example Music Title"
                  }
                }
              }
            }
          }
        },
        "responses": {
          "200": {
            "description": "Musique ajoutée à la file d'attente"
          },
          "400": {
            "description": "Données invalides"
          },
          "500": {
            "description": "Erreur serveur interne"
          }
        }
      }
    },
    "/queues/{roomId}/musics/{musicId}": {
      "delete": {
        "summary": "Supprime une musique d'une file d'attente",
        "parameters": [
          {
            "name": "roomId",
            "in": "path",
            "required": true,
            "schema": {
              "type": "string"
            }
          },
          {
            "name": "musicId",
            "in": "path",
            "required": true,
            "schema": {
              "type": "string"
            }
          }
        ],
        "responses": {
          "200": {
            "description": "Musique supprimée de la file d'attente"
          },
          "404": {
            "description": "File d'attente ou musique non trouvée"
          },
          "500": {
            "description": "Erreur serveur interne"
          }
        }
      }
    },
    "/queues/{roomId}/musics/{musicId}/validate": {
      "put": {
        "summary": "Valider une musique (passe son statut à 'playing')",
        "parameters": [
          {
            "name": "roomId",
            "in": "path",
            "required": true,
            "schema": {
              "type": "string"
            }
          },
          {
            "name": "musicId",
            "in": "path",
            "required": true,
            "schema": {
              "type": "string"
            }
          }
        ],
        "responses": {
          "200": {
            "description": "Musique validée"
          },
          "404": {
            "description": "File d'attente ou musique non trouvée"
          },
          "500": {
            "description": "Erreur serveur interne"
          }
        }
      }
    },
    "/queues/{roomId}/musics/{musicId}/skip": {
      "put": {
        "summary": "Passer une musique (passe son statut à 'played' et supprime de la file d'attente)",
        "parameters": [
          {
            "name": "roomId",
            "in": "path",
            "required": true,
            "schema": {
              "type": "string"
            }
          },
          {
            "name": "musicId",
            "in": "path",
            "required": true,
            "schema": {
              "type": "string"
            }
          }
        ],
        "responses": {
          "200": {
            "description": "Musique passée"
          },
          "404": {
            "description": "File d'attente ou musique non trouvée"
          },
          "500": {
            "description": "Erreur serveur interne"
          }
        }
      }
    },
    "/rooms": {
      "post": {
        "summary": "Crée une nouvelle room",
        "requestBody": {
          "required": true,
          "content": {
            "application/json": {
              "schema": {
                "type": "object",
                "properties": {
                  "name": {
                    "type": "string",
                    "example": "Room Name"
                  },
                  "description": {
                    "type": "string",
                    "example": "Room Description"
                  }
                }
              }
            }
          }
        },
        "responses": {
          "201": {
            "description": "Room créée"
          },
          "400": {
            "description": "Données invalides"
          },
          "500": {
            "description": "Erreur serveur interne"
          }
        }
      }
    },
    "/rooms/{id}": {
      "delete": {
        "summary": "Supprime une room par ID",
        "parameters": [
          {
            "name": "id",
            "in": "path",
            "required": true,
            "schema": {
              "type": "string"
            }
          }
        ],
        "responses": {
          "200": {
            "description": "Room supprimée"
          },
          "404": {
            "description": "Room non trouvée"
          },
          "500": {
            "description": "Erreur serveur interne"
          }
        }
      },
      "put": {
        "summary": "Modifie une room par ID",
        "parameters": [
          {
            "name": "id",
            "in": "path",
            "required": true,
            "schema": {
              "type": "string"
            }
          }
        ],
        "requestBody": {
          "required": true,
          "content": {
            "application/json": {
              "schema": {
                "type": "object",
                "properties": {
                  "name": {
                    "type": "string",
                    "example": "Updated Room Name"
                  },
                  "description": {
                    "type": "string",
                    "example": "Updated Room Description"
                  }
                }
              }
            }
          }
        },
        "responses": {
          "200": {
            "description": "Room mise à jour"
          },
          "404": {
            "description": "Room non trouvée"
          },
          "500": {
            "description": "Erreur serveur interne"
          }
        }
      }
    }
  },
  "components": {
    "schemas": {
      "Music": {
        "type": "object",
        "properties": {
          "id": {
            "type": "string",
            "example": "60d21b4667d0d8992e610c85"
          },
          "title": {
            "type": "string",
            "example": "Example Music Title"
          },
          "url": {
            "type": "string",
            "example": "https://example.com/music.mp3"
          },
          "status": {
            "type": "string",
            "enum": [
              "waiting",
              "playing",
              "played"
            ],
            "example": "waiting"
          }
        }
      },
      "User": {
        "type": "object",
        "properties": {
          "id": {
            "type": "string",
            "example": "60d21b4667d0d8992e610c85"
          },
          "firebaseToken": {
            "type": "string",
            "example": "abc123"
          }
        }
      },
      "Queue": {
        "type": "object",
        "properties": {
          "roomId": {
            "type": "string",
            "example": "room123"
          },
          "musics": {
            "type": "array",
            "items": {
              "$ref": "#/components/schemas/Music"
            }
          }
        }
      },
      "Room": {
        "type": "object",
        "properties": {
          "id": {
            "type": "string",
            "example": "60d21b4667d0d8992e610c85"
          },
          "name": {
            "type": "string",
            "example": "Room Name"
          },
          "description": {
            "type": "string",
            "example": "Room Description"
          }
        }
      }
    }
  }
};

module.exports = (app) => {
  app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerDocument));
};
