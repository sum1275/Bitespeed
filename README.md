# Bitespeed Backend Assignment

## Installation
To install Bitespeed Backend, follow these steps:
1. Clone the repository:
   ```bash
   https://github.com/sum1275/Bitespeed.git
## Instruction 
   ```bash
https://bitespeed.notion.site/Bitespeed-Backend-Task-Identity-Reconciliation-53392ab01fe149fab989422300423199
```
## Database and Server Configuration for Development Environment
1. Create a file named `.env` in the root directory of the project.
2. Add the following content to the `.env` file:

```plaintext
# Environment variables for development

DEV_PORT=8084
NODE_ENV=development
DB_DEV_URL=postgres://<USERNAME>:<PASSWORD>@postgres-sumitsinha215-3ea3.k.aivencloud.com:16585/defaultdb
DB_SSL_MODE=require
DB_SSL_CA="-----BEGIN CERTIFICATE-----
MIIEQTCCAqmgAwIBAgIUFFO4zCgrSy/Vdni7SN5DKQPjpfAwDQYJKoZIhvcNAQEM
BQAwOjE4MDYGA1UEAwwvYTM5OGNiMTItYWFhMS00NWUxLWE3NmUtOGYzZmM3Y2Qz
NDAxIFByb2plY3QgQ0EwHhcNMjQwNTIzMDk0NDU2WhcNMzQwNTIxMDk0NDU2WjA6
MTgwNgYDVQQDDC9hMzk4Y2IxMi1hYWExLTQ1ZTEtYTc2ZS04ZjNmYzdjZDM0MDEg
UHJvamVjdCBDQTCCAaIwDQYJKoZIhvcNAQEBBQADggGPADCCAYoCggGBAKfGp3xS
1pdK5jTs635WJpTApoqc0dLgF02AfOhmvzVNWkO5M7zH4Llokvz2WPQ6ZAEzdm9q
+DgZe9LeowhwnFkNtr0y40mWYGyvsfQKUyAucCBQytJebLnVvXb3OXP2DHgJ+LIw
J+yZG0aRyEgfuWLw2GzbC7D+fyxlNSVADvHjBpE38gWWLcLRMpuKIOAKwBrpW+Ak
FSaCu+wg9o2I/4kLInZb4JcpwYdef25sn/wng00JhJcWt9rfu8SSTJrbJQd8Uj/q
5z9lAOs6ABBCMNHMAVEVcYZv3a5iUlVG650PFxUUMV/kJZAcb2ogC18QRtmwlS5p
uXbJdJElaVaULFAdq+q3WQffPmYRO2o0pUPQ1WnGisnwiXE/GowE47SiKLUQ0GyF
CiviKWa0coUvilF7gwb1T5OWkb0W82hbFzYmXNEYSUjtBqzxivWQGfDlSxvRgmwv
T8NdRQBWmGgzEYmF5sJb+/2cO9BPxVh6WnRb97ZzRfqobd+lFZrjhoRodQIDAQAB
oz8wPTAdBgNVHQ4EFgQUZLs61j6U0XOQXT6R9Yq1dbh4RlkwDwYDVR0TBAgwBgEB
/wIBADALBgNVHQ8EBAMCAQYwDQYJKoZIhvcNAQEMBQADggGBAEGpQ/xkboHKJ3au
XErkmp7lKa0oAJSgaEJvP2VNCBMWxA0ChhdU1uXe73aU8AlWBOejC/YNoqu+UfMe
fFgMid0xiBVdNDtmFUlOrGQfCferIZp7f3UL/Z0jC3xbTRpCg/VztpMxaN6Hk0kR
od2diKY5N6s4VSI7fDZEOopH3l51pWSeqAv/nocbN2arij9xEvkMGUtynveXxgd9
+AwzBjrtPoJV89v3TvUADeilYmnGkqqYIG4miXqRYfSEODqtWeF4p0NFW624eMCt
-----END CERTIFICATE-----"
```
## API Endpoints
 - **Method**: `POST`
 - **Request Body**:
  ```json form-data
{
    "email": "bob@hillvalley.edu",
    "phoneNumber": "897896"
}
 ```
 - **Response Sample**:
   

```json
{
    "contact": {
        "primaryContactId": 3,
        "emails": [
            "bob@hillvalley.edu"
        ],
        "phoneNumbers": [
            "897896"
        ],
        "secondaryContactIds": []
    }
}
```
## EDGE CASES
1.Submit new email and phoneNumber
 - **Request Body**:
  ```json form-data
{
"email":"mcfly@hillval.edu",
"phoneNumber":"123456"
}
  ```
- **Response**:
   

```json form-data
{
    "contact": {
        "primaryContactId": 1,
        "emails": [
            "mcfly@hillval.edu"
        ],
        "phoneNumbers": [
            "123456"
        ],
        "secondaryContactIds": []
    }
}

```
2.Submit “email” with new phone number, should become secondary with link id.
 - **Request Body**:
  ```json form-data
{
"email":"mcfly@hillval.edu",
"phoneNumber":"234567"
}
  ```
- **Response**:
   

```json form-data
{
    "contact": {
        "primaryContactId": 1,
        "emails": [
            "mcfly@hillval.edu"
        ],
        "phoneNumbers": [
            "123456"
        ],
        "secondaryContactIds": []
    }
}

```
3.Submit “email” with another new phone number, should become secondary with link id.
 - **Request Body**:
  ```json form-data
{
    "email": "mcfly@hillvalley.edu",
    "phoneNumber": "345678"
}
  ```
- **Response**:
   

```json form-data
{
    "contact": {
        "primaryContactId": 2,
        "emails": [
            "mcfly@hillvalley.edu"
        ],
        "phoneNumbers": [
            "345678"
        ],
        "secondaryContactIds": []
    }
}

```
4.Submit “existing secondary phone number” with new email, should make new record primary and adjust link id of existing secondary.
- **Request Body**:
  ```json form-data
  {
    "email": "bob@hillvalley.edu",
    "phoneNumber": "345678"
   }
  ```
- **Response**:
   

```json form-data
{
    "contact": {
        "primaryContactId": 2,
        "emails": [
            "mcfly@hillvalley.edu"
        ],
        "phoneNumbers": [
            "345678"
        ],
        "secondaryContactIds": []
    }
}

```

