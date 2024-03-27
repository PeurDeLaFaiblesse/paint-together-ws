import expressWs from 'express-ws';
import express from 'express';
import cors from 'cors';
import fs from 'fs';
import path from 'path';

const PORT = 5000;

(() => {
  const WSServer = expressWs(express());
  const aWSS = WSServer.getWss();
  const appWS = WSServer.app;

  appWS.use(cors());
  appWS.use(express.json());

  const broadcastConnection = (ws, message) => {
    aWSS.clients.forEach((client) => {
      if (client.id === message.id) {
        client.send(JSON.stringify(message));
      }
    });
  };

  const handleConnection = (ws, message) => {
    console.log({ message });
    ws.id = message.id;
    ws.username = message.username;
    broadcastConnection(ws, message);
  };

  appWS.ws('/', (ws, req) => {
    ws.on('message', (data) => {
      const message = JSON.parse(data as unknown as string);

      switch (message.method) {
        case 'connection': {
          handleConnection(ws, message);
          break;
        }
        case 'draw': {
          broadcastConnection(ws, message);
          break;
        }
      }
    });
  });

  appWS.post('/canvas', (req, res) => {
    try {
      const canvas = req.body.canvas.replace('data:image/png;base64,', '');
      fs.writeFileSync(path.resolve(__dirname, 'files', `${req.query.sessionId}.jpg`), canvas, 'base64');

      return res.status(200).json({ message: 'received' });
    } catch (e) {
      console.error(e);
      return res.status(500).json({ error: 'error' });
    }
  });

  appWS.get('/canvas', (req, res) => {
    try {
      const canvas = fs.readFileSync(path.resolve(__dirname, 'files', `${req.query.sessionId}.jpg`));
      res.json('data:image/png;base64,' + canvas.toString('base64'));

      return res.status(200).json({ message: 'sent' });
    } catch (e) {
      console.error(e);
      return res.status(500).json({ error: 'error' });
    }
  });

  appWS.listen(PORT, () => console.log('Server was started with PORT = ' + PORT));
})();
