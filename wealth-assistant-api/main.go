package main

import (
	"errors"
	"net/http"

	"github.com/gin-contrib/cors"
	"github.com/gin-gonic/gin"
)

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
	panic(errors.ErrUnsupported.Error())
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
