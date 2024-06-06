const httpMapStatus: { [key: string]: number } = {
  'SUCCESSFUL': 200,
  'CREATED': 201,
  'NO_CONTENT': 204,
  'BAD_REQUEST': 400,
  'UNAUTHORIZED': 401,
  'FORBIDDEN': 403,
  'NOT_FOUND': 404,
  'INTERNAL_SERVER_ERROR': 500,
}

export function getHTTPStatusMessage(status: string): number {
  return httpMapStatus[status] || 500;
}