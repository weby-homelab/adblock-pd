//go:build !linux

package ipset

import (
	"context"

	"github.com/AdguardTeam/ADBlock-PD/internal/aghos"
)

func newManager(_ context.Context, _ *Config) (mgr Manager, err error) {
	return nil, aghos.Unsupported("ipset")
}
