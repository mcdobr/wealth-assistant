package main

import (
	"encoding/json"
	"errors"
	"net/http"

	"github.com/gin-contrib/cors"
	"github.com/gin-gonic/gin"
	"github.com/ing-bank/gohateoas"
)

type ApiResponse struct {
	Data any `json:"data"`
}

type Asset struct {
	ID   int64  `json:"id"`
	Name string `json:"name"`
}

type Income struct {
	ID int64
}

type Expense struct {
	ID int64
}

func (apiResponse ApiResponse) MarshalJson() ([]byte, error) {
	return json.Marshal(struct {
		Data json.RawMessage `json:"data"`
	}{
		Data: gohateoas.InjectLinks(gohateoas.DefaultLinkRegistry, apiResponse.Data),
	})
}

func main() {
	router := gin.Default()
	router.SetTrustedProxies(nil)

	router.Use(
		cors.New(cors.Config{
			AllowOrigins:     []string{"http://localhost:5173"},
			AllowMethods:     []string{"GET", "POST", "PUT", "PATCH", "DELETE"},
			AllowHeaders:     []string{"Origin"},
			ExposeHeaders:    []string{"Content-Length"},
			AllowCredentials: true,
		}))

	gohateoas.Register(Asset{}, gohateoas.Self("/api/v1/assests/{asset-id}", "Get the asset"))

	apiRoutesV1 := router.Group("/api/v1")
	assetsResources := apiRoutesV1.Group("/assets")

	assetsResources.GET("", findAssets)
	assetsResources.GET("/:asset-id", findAsset)

	assetsResources.POST("", createAsset)
	assetsResources.PUT("/:asset-id", replaceAsset)

	assetsResources.DELETE("/:asset-id", deleteAsset)

	router.Run("localhost:8080")
}

func findAssets(context *gin.Context) {
	context.JSON(http.StatusOK, nil)
}

func findAsset(context *gin.Context) {
	// For now, we can imagine that a DB lookup happens here
	asset := Asset{
		ID:   1,
		Name: "S&P 500 Index",
	}

	context.JSON(http.StatusOK, ApiResponse{
		Data: asset,
	})
}

func createAsset(context *gin.Context) {
	panic(errors.ErrUnsupported.Error())
}

func replaceAsset(context *gin.Context) {
	panic(errors.ErrUnsupported.Error())
}

func deleteAsset(context *gin.Context) {
	panic(errors.ErrUnsupported.Error())
}
