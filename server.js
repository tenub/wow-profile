import express from 'express';
import api from './lib/api';

express()
	.use('/api', api)
	.listen(process.env.API_PORT);
