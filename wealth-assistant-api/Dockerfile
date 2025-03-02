# Build the program
FROM golang:1.24 AS build-stage
WORKDIR /app
COPY go.mod go.sum ./
RUN go mod download
COPY *.go ./
RUN CGO_ENABLED=0 GOOS=linux go build -o /wealth-assistant-api

# Run the tests
FROM build-stage as test-stage
RUN go test -v ./...

# Build the production container
FROM gcr.io/distroless/base-debian11 AS production-stage
WORKDIR /
COPY --from=build-stage /wealth-assistant-api /wealth-assistant-api

EXPOSE 8080
USER nonroot:nonroot
ENTRYPOINT ["/wealth-assistant-api"]
