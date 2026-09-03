package dnsforward

import (
	"testing"

	"github.com/miekg/dns"
	"github.com/stretchr/testify/assert"
	"github.com/stretchr/testify/require"
)

func TestServer_replyCopiesEDNS(t *testing.T) {
	t.Parallel()

	server := &Server{}
	req := new(dns.Msg)
	req.SetQuestion("example.org.", dns.TypeA)
	req.SetEdns0(1232, true)

	resp := server.reply(req, dns.RcodeServerFailure)
	opt := resp.IsEdns0()
	require.NotNil(t, opt)
	assert.Equal(t, uint16(1232), opt.UDPSize())
	assert.True(t, opt.Do())
}

func TestServer_NewMsgNOTIMPLEMENTED(t *testing.T) {
	t.Parallel()

	server := &Server{}
	req := new(dns.Msg)
	req.SetQuestion("example.org.", dns.TypeA)

	resp := server.NewMsgNOTIMPLEMENTED(req)
	assert.Nil(t, resp.IsEdns0())

	req.SetEdns0(1232, true)
	resp = server.NewMsgNOTIMPLEMENTED(req)
	opt := resp.IsEdns0()
	require.NotNil(t, opt)
	assert.Equal(t, uint16(1452), opt.UDPSize())
	assert.False(t, opt.Do())
}
