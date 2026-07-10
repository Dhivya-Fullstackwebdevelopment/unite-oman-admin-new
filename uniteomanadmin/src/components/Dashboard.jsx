import React from 'react';

const Dashboard = () => {
  return (
    <div style={{ flex: 1, background: '#F4F5F8', padding: '24px', overflowY: 'auto' }}>
      {/* Header */}
      <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '20px' }}>
        <div>
          <div style={{ font: '800 20px/1.2 sans-serif', color: '#0A0A0F' }}>Admin Dashboard</div>
          <div style={{ font: '400 13px/1 sans-serif', color: '#9090A0', marginTop: '4px' }}>Household · 9 July 2026</div>
        </div>
        <div style={{ display: 'flex', alignItems: 'center', gap: '8px', background: 'rgba(214,28,168,.05)', border: '1px solid rgba(214,28,168,.15)', borderRadius: '24px', padding: '6px 14px' }}>
          <span style={{ fontSize: '16px' }}>✨</span>
          <span style={{ font: '600 12px/1 sans-serif', color: '#D61CA8' }}>AI Active</span>
        </div>
      </div>

      {/* KPI Cards */}
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(4,1fr)', gap: '16px', marginBottom: '20px' }}>
        {/* Booking Today */}
        <div style={{ background: 'white', borderRadius: '12px', padding: '18px', boxShadow: '0 1px 4px rgba(0,0,0,.05)', position: 'relative', overflow: 'hidden' }}>
          <div style={{ position: 'absolute', top: 0, left: 0, right: 0, height: '3px', background: '#D61CA8' }}></div>
          <div style={{ font: '400 11px/1 sans-serif', color: '#9090A0', textTransform: 'uppercase', letterSpacing: '.5px', marginBottom: '6px' }}>Bookings Today</div>
          <div style={{ font: '800 22px/1 sans-serif', color: '#D61CA8' }}>147</div>
          <div style={{ font: '600 11px/1 sans-serif', color: '#10B981', marginTop: '4px' }}>↑ 18 vs yesterday</div>
        </div>

        {/* Revenue */}
        <div style={{ background: 'white', borderRadius: '12px', padding: '18px', boxShadow: '0 1px 4px rgba(0,0,0,.05)', position: 'relative', overflow: 'hidden' }}>
          <div style={{ position: 'absolute', top: 0, left: 0, right: 0, height: '3px', background: '#10B981' }}></div>
          <div style={{ font: '400 11px/1 sans-serif', color: '#9090A0', textTransform: 'uppercase', letterSpacing: '.5px', marginBottom: '6px' }}>Revenue (July)</div>
          <div style={{ font: '800 22px/1 sans-serif', color: '#10B981' }}>OMR 56,143</div>
          <div style={{ font: '600 11px/1 sans-serif', color: '#10B981', marginTop: '4px' }}>↑ 18% vs June</div>
        </div>

        {/* Unassigned */}
        <div style={{ background: 'white', borderRadius: '12px', padding: '18px', boxShadow: '0 1px 4px rgba(0,0,0,.05)', position: 'relative', overflow: 'hidden' }}>
          <div style={{ position: 'absolute', top: 0, left: 0, right: 0, height: '3px', background: '#F59E0B' }}></div>
          <div style={{ font: '400 11px/1 sans-serif', color: '#9090A0', textTransform: 'uppercase', letterSpacing: '.5px', marginBottom: '6px' }}>Unassigned</div>
          <div style={{ font: '800 22px/1 sans-serif', color: '#F59E0B' }}>12</div>
          <div style={{ font: '600 11px/1 sans-serif', color: '#10B981', marginTop: '4px' }}>Need routing</div>
        </div>

        {/* Active Vendors */}
        <div style={{ background: 'white', borderRadius: '12px', padding: '18px', boxShadow: '0 1px 4px rgba(0,0,0,.05)', position: 'relative', overflow: 'hidden' }}>
          <div style={{ position: 'absolute', top: 0, left: 0, right: 0, height: '3px', background: '#4B6EF5' }}></div>
          <div style={{ font: '400 11px/1 sans-serif', color: '#9090A0', textTransform: 'uppercase', letterSpacing: '.5px', marginBottom: '6px' }}>Active Vendors</div>
          <div style={{ font: '800 22px/1 sans-serif', color: '#4B6EF5' }}>234</div>
          <div style={{ font: '600 11px/1 sans-serif', color: '#10B981', marginTop: '4px' }}>of 312 total</div>
        </div>
      </div>

      {/* AI Insight */}
      <div style={{ background: 'rgba(214,28,168,.04)', border: '1px solid rgba(214,28,168,.12)', borderRadius: '12px', padding: '14px 18px', marginBottom: '20px', display: 'flex', gap: '10px', alignItems: 'flex-start' }}>
        <span style={{ fontSize: '20px' }}>🤖</span>
        <div style={{ font: '400 13px/1.6 sans-serif', color: '#6B7280' }}>
          <strong style={{ color: '#D61CA8' }}>AI:</strong> AC demand up 34% (summer). 12 unmatched in Bowsher — recruit 4 more AC techs. Vendor Ali inactive 18 days — churn risk, auto-email sent.
        </div>
      </div>

      {/* Bottom Grid */}
      <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '16px' }}>
        {/* Service Demand */}
        <div style={{ background: 'white', borderRadius: '14px', padding: '20px', boxShadow: '0 1px 5px rgba(0,0,0,.05)' }}>
          <div style={{ font: '700 15px/1 sans-serif', color: '#0A0A0F', marginBottom: '14px' }}>Service Demand</div>
          
          {/* AC Service */}
          <div style={{ marginBottom: '10px' }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '4px' }}>
              <span style={{ font: '500 12px/1 sans-serif', color: '#0A0A0F' }}>❄️ AC Service</span>
              <span style={{ font: '700 11px/1 sans-serif', color: '#D61CA8' }}>38%</span>
            </div>
            <div style={{ height: '6px', background: '#F0F0F4', borderRadius: '3px', overflow: 'hidden' }}>
              <div style={{ width: '38%', height: '100%', background: '#D61CA8', borderRadius: '3px' }}></div>
            </div>
          </div>

          {/* Cleaning */}
          <div style={{ marginBottom: '10px' }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '4px' }}>
              <span style={{ font: '500 12px/1 sans-serif', color: '#0A0A0F' }}>🧹 Cleaning</span>
              <span style={{ font: '700 11px/1 sans-serif', color: '#8B2EF5' }}>24%</span>
            </div>
            <div style={{ height: '6px', background: '#F0F0F4', borderRadius: '3px', overflow: 'hidden' }}>
              <div style={{ width: '24%', height: '100%', background: '#8B2EF5', borderRadius: '3px' }}></div>
            </div>
          </div>

          {/* Plumbing */}
          <div style={{ marginBottom: '10px' }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '4px' }}>
              <span style={{ font: '500 12px/1 sans-serif', color: '#0A0A0F' }}>🔧 Plumbing</span>
              <span style={{ font: '700 11px/1 sans-serif', color: '#4B6EF5' }}>15%</span>
            </div>
            <div style={{ height: '6px', background: '#F0F0F4', borderRadius: '3px', overflow: 'hidden' }}>
              <div style={{ width: '15%', height: '100%', background: '#4B6EF5', borderRadius: '3px' }}></div>
            </div>
          </div>

          {/* Electrical */}
          <div style={{ marginBottom: '10px' }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '4px' }}>
              <span style={{ font: '500 12px/1 sans-serif', color: '#0A0A0F' }}>⚡ Electrical</span>
              <span style={{ font: '700 11px/1 sans-serif', color: '#10B981' }}>12%</span>
            </div>
            <div style={{ height: '6px', background: '#F0F0F4', borderRadius: '3px', overflow: 'hidden' }}>
              <div style={{ width: '12%', height: '100%', background: '#10B981', borderRadius: '3px' }}></div>
            </div>
          </div>

          {/* Beauty */}
          <div style={{ marginBottom: '10px' }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '4px' }}>
              <span style={{ font: '500 12px/1 sans-serif', color: '#0A0A0F' }}>💅 Beauty</span>
              <span style={{ font: '700 11px/1 sans-serif', color: '#F59E0B' }}>8%</span>
            </div>
            <div style={{ height: '6px', background: '#F0F0F4', borderRadius: '3px', overflow: 'hidden' }}>
              <div style={{ width: '8%', height: '100%', background: '#F59E0B', borderRadius: '3px' }}></div>
            </div>
          </div>

          {/* Others */}
          <div style={{ marginBottom: '10px' }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '4px' }}>
              <span style={{ font: '500 12px/1 sans-serif', color: '#0A0A0F' }}>Others</span>
              <span style={{ font: '700 11px/1 sans-serif', color: '#C0C0CC' }}>3%</span>
            </div>
            <div style={{ height: '6px', background: '#F0F0F4', borderRadius: '3px', overflow: 'hidden' }}>
              <div style={{ width: '3%', height: '100%', background: '#C0C0CC', borderRadius: '3px' }}></div>
            </div>
          </div>
        </div>

        {/* Unassigned - Urgent */}
        <div style={{ background: 'white', borderRadius: '14px', padding: '20px', boxShadow: '0 1px 5px rgba(0,0,0,.05)' }}>
          <div style={{ font: '700 15px/1 sans-serif', color: '#0A0A0F', marginBottom: '14px' }}>Unassigned — Urgent</div>
          
          {/* Task 1 */}
          <div style={{ display: 'flex', alignItems: 'center', gap: '10px', padding: '12px 14px', background: '#FFF8F0', borderRadius: '10px', marginBottom: '8px', borderLeft: '4px solid #F59E0B' }}>
            <span style={{ fontSize: '18px' }}>💅</span>
            <div style={{ flex: 1 }}>
              <div style={{ font: '600 13px/1 sans-serif', color: '#0A0A0F' }}>Beauty at Home · Sara Al-Rawahi</div>
              <div style={{ font: '400 11px/1 sans-serif', color: '#9090A0', marginTop: '2px' }}>MSQ Hills · 4pm</div>
            </div>
            <div style={{ padding: '6px 14px', background: '#D61CA8', borderRadius: '8px', font: '700 10px/1 sans-serif', color: 'white', cursor: 'pointer' }}>Assign</div>
          </div>

          {/* Task 2 */}
          <div style={{ display: 'flex', alignItems: 'center', gap: '10px', padding: '12px 14px', background: '#FFF8F0', borderRadius: '10px', marginBottom: '8px', borderLeft: '4px solid #F59E0B' }}>
            <span style={{ fontSize: '18px' }}>❄️</span>
            <div style={{ flex: 1 }}>
              <div style={{ font: '600 13px/1 sans-serif', color: '#0A0A0F' }}>AC Deep Cleaning · Nasser Al-B.</div>
              <div style={{ font: '400 11px/1 sans-serif', color: '#9090A0', marginTop: '2px' }}>Bowsher · 3pm</div>
            </div>
            <div style={{ padding: '6px 14px', background: '#D61CA8', borderRadius: '8px', font: '700 10px/1 sans-serif', color: 'white', cursor: 'pointer' }}>Assign</div>
          </div>

          {/* Task 3 */}
          <div style={{ display: 'flex', alignItems: 'center', gap: '10px', padding: '12px 14px', background: '#FFF8F0', borderRadius: '10px', marginBottom: '8px', borderLeft: '4px solid #F59E0B' }}>
            <span style={{ fontSize: '18px' }}>🧹</span>
            <div style={{ flex: 1 }}>
              <div style={{ font: '600 13px/1 sans-serif', color: '#0A0A0F' }}>Deep Cleaning · Hana Al-Rashdi</div>
              <div style={{ font: '400 11px/1 sans-serif', color: '#9090A0', marginTop: '2px' }}>Qurum · 5pm</div>
            </div>
            <div style={{ padding: '6px 14px', background: '#D61CA8', borderRadius: '8px', font: '700 10px/1 sans-serif', color: 'white', cursor: 'pointer' }}>Assign</div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;