.PHONY: proto server web dev

# Generate gRPC code from proto files
proto:
	@echo "Generating gRPC code..."
	mkdir -p api/user
	protoc --proto_path=proto --go_out=api/user --go_opt=paths=source_relative --go-grpc_out=api/user --go-grpc_opt=paths=source_relative proto/user.proto
	mkdir -p web/proto
	cp proto/user.proto web/proto/user.proto
	@echo "Proto generation complete."

# Run Go server
server:
	go run main.go

# Run Next.js web application
web:
	cd web && npm run dev

# Run both (using & in windows powershell might be tricky, better to run separately)
dev:
	@echo "Run 'make server' and 'make web' in separate terminals."

# Tidy up Go modules
tidy:
	go mod tidy
