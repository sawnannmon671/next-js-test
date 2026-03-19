.PHONY: proto server web dev

# Generate gRPC code from proto files
proto:
	@echo "Generating gRPC code..."
	mkdir -p api/user api/approval web/proto
	protoc --proto_path=proto --go_out=api/user --go_opt=paths=source_relative --go-grpc_out=api/user --go-grpc_opt=paths=source_relative proto/user.proto
	protoc --proto_path=proto --go_out=api/approval --go_opt=paths=source_relative --go-grpc_out=api/approval --go-grpc_opt=paths=source_relative proto/approval_status.proto
	cp proto/user.proto web/proto/user.proto
	cp proto/approval_status.proto web/proto/approval_status.proto
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
