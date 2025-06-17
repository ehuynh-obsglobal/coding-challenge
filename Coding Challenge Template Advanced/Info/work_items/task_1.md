# Task: Implement Error Handling to Service

## Description
Implement comprehensive error handling in the DataService to properly manage HTTP error responses. This includes handling common HTTP status codes (4xx and 5xx), network timeouts, and connection failures. The implementation should provide meaningful error messages to the client, log errors appropriately, and implement retry mechanisms for transient failures. The error handling system should differentiate between client-side errors (like invalid requests) and server-side issues, ensuring proper feedback is provided to users.

## Acceptance Criteria
- The DataService methods must handle common HTTP status codes.
- When an error status code is returned by the API, the DataService must provide meaningful error messages to the client.
- [ ] Criteria 3

## Dependencies
- [List any dependencies or blockers]

## Notes
- [Additional information or context]

## Definition of Done
- [ ] Code implemented
- [ ] Unit tests written
- [ ] Code reviewed
- [ ] Documentation updated
- [ ] Tests passed
- [ ] Changes deployed

## Related Items
- Related User Story: #[ID]
- Related Bug: #[ID]











implement circuit breaker
- see if they retry transient errors
    - 

    1) uild error handling
    2) add retries
    do they allow retries to go infinitely??