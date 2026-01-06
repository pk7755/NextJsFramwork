import { Connection } from "mongoose"

/**
 * Global cache to prevent multiple connections
 * during hot reloads / serverless executions
 */


declare global {
    var mongoose:{
        conn: Connection | null,
        promise: Promise<Connection> | null
    }
}

export {}