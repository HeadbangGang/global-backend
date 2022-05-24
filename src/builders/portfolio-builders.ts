import express from 'express'
const projects = require('../static-responses/portfolio-projects')

export const projectsBuilder = (req: express.Request, res: express.Response, next: express.NextFunction) => res.status(200).send(projects)
