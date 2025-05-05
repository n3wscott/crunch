package main

import (
	"fmt"
	"github.com/n3wscott/crunch/pkg/cipher"
	"os"
	"strings"

	"github.com/spf13/cobra"
)

var root = &cobra.Command{
	Use:   "crunch",
	Short: "Crunchlabs Cipher Machine Simulator",
}

var encode = &cobra.Command{
	Use:   "encode",
	Short: "encode",
	Run: func(cmd *cobra.Command, args []string) {
		input := strings.Join(args, " ")
		blue := cmd.Flags().Lookup("blue").Value.String()
		red := cmd.Flags().Lookup("red").Value.String()

		encoder := cipher.New(blue, red)

		output := encoder.Encode(input)
		cmd.Println(output)
	},
}

var decode = &cobra.Command{
	Use:   "decode",
	Short: "decode",
	Run: func(cmd *cobra.Command, args []string) {
		input := strings.Join(args, " ")
		blue := cmd.Flags().Lookup("blue").Value.String()
		red := cmd.Flags().Lookup("red").Value.String()

		encoder := cipher.New(blue, red)

		output := encoder.Decode(input)
		cmd.Println(output)
	},
}

func init() {
	root.AddCommand(encode, decode)

	root.PersistentFlags().StringP("red", "r", "A", "The Red (decoding) wheel key.")
	root.PersistentFlags().StringP("blue", "b", "A", "The Blue (encoding) wheel key.")
}

func main() {
	if err := root.Execute(); err != nil {
		fmt.Println(err)
		os.Exit(1)
	}
}
