import express from 'express';
import { apiSim, apiWow } from './lib/api';

express()
	.use('/api/wow', apiWow)
	.use('/api/sim', apiSim)
	.listen(process.env.API_PORT);
