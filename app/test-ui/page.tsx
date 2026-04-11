'use client';

import { useState } from 'react';
import { Button } from '@/components/ui/Button';
import { Input } from '@/components/ui/Input';
import { Card } from '@/components/ui/Card';
import { Badge } from '@/components/ui/Badge';

export default function TestUIPage() {
  const [inputValue, setInputValue] = useState('');

  return (
    <main
      className="min-h-screen p-8"
      style={{ backgroundColor: 'var(--bg)', color: 'var(--text)' }}
    >
      <div className="max-w-6xl mx-auto">
        <header className="mb-10 flex items-center justify-between border-b border-[var(--border)] pb-6">
          <h1 className="font-[var(--font-display)] text-4xl text-[var(--gold)] tracking-tight">
            Prompt Forge OS — UI Kit
          </h1>
          <Badge variant="gold" size="md">v1.0.0</Badge>
        </header>

        <div className="space-y-12">
          {/* Badges primero para referencia rápida */}
          <section>
            <h2 className="font-[var(--font-body)] text-xl mb-4 text-[var(--text-dim)] flex items-center gap-3">
              Badges
              <Badge variant="ghost" size="sm">12 variantes</Badge>
            </h2>
            <div className="flex flex-wrap gap-3">
              <Badge variant="gold">Gold</Badge>
              <Badge variant="green">Green</Badge>
              <Badge variant="red">Red</Badge>
              <Badge variant="blue">Blue</Badge>
              <Badge variant="purple">Purple</Badge>
              <Badge variant="ghost">Ghost</Badge>
              <Badge variant="gold" size="sm">Small</Badge>
              <Badge variant="green" size="sm">Success</Badge>
            </div>
          </section>

          {/* Buttons */}
          <section>
            <h2 className="font-[var(--font-body)] text-xl mb-4 text-[var(--text-dim)]">
              Buttons
            </h2>
            <div className="flex flex-wrap gap-4 items-center">
              <Button variant="primary" onClick={() => alert('Primary clicked')}>
                Primary Button
              </Button>
              <Button variant="ghost">Ghost Button</Button>
              <Button variant="danger">Danger Button</Button>
              <Button loading>Loading</Button>
              <Button disabled>Disabled</Button>
              <Button size="sm">Small</Button>
              <Button size="lg">Large</Button>
            </div>
          </section>

          {/* Inputs */}
          <section>
            <h2 className="font-[var(--font-body)] text-xl mb-4 text-[var(--text-dim)]">
              Inputs
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <Input
                label="Nombre completo"
                placeholder="Ej: Juan Pérez"
                value={inputValue}
                onChange={(e) => setInputValue(e.target.value)}
              />
              <Input
                label="Email"
                type="email"
                placeholder="tu@email.com"
                defaultValue="usuario@ejemplo.com"
              />
              <Input
                label="Con error"
                placeholder="Campo inválido"
                error="Este campo es obligatorio"
              />
              <Input
                label="Deshabilitado"
                placeholder="No editable"
                disabled
                value="Texto bloqueado"
              />
              <Input
                label="Contraseña"
                type="password"
                placeholder="••••••••"
              />
            </div>
            {inputValue && (
              <p className="mt-4 font-[var(--font-mono)] text-sm text-[var(--text-dim)]">
                Valor actual: {inputValue}
              </p>
            )}
          </section>

          {/* Cards */}
          <section>
            <h2 className="font-[var(--font-body)] text-xl mb-4 text-[var(--text-dim)]">
              Cards
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
              <Card padding="md">
                <div className="flex items-center justify-between mb-3">
                  <h3 className="font-[var(--font-body)] font-medium text-[var(--text)]">
                    Plan Free
                  </h3>
                  <Badge variant="ghost" size="sm">Básico</Badge>
                </div>
                <p className="text-sm text-[var(--text-dim)] mb-4">
                  10 forges por mes, acceso a 50 agentes.
                </p>
                <Button variant="ghost" size="sm" className="w-full">
                  Tu plan actual
                </Button>
              </Card>

              <Card padding="md" onClick={() => alert('Card clickeable')}>
                <div className="flex items-center justify-between mb-3">
                  <h3 className="font-[var(--font-body)] font-medium text-[var(--text)]">
                    Plan Pro
                  </h3>
                  <Badge variant="gold" size="sm">Popular</Badge>
                </div>
                <p className="text-sm text-[var(--text-dim)] mb-4">
                  Forges ilimitados, 162 agentes, historial completo.
                </p>
                <div className="font-[var(--font-mono)] text-lg text-[var(--gold)] mb-4">
                  /mes
                </div>
                <Button variant="primary" size="sm" className="w-full">
                  Actualizar
                </Button>
              </Card>

              <Card padding="lg" className="border-[var(--border-gold)]">
                <div className="flex items-center gap-3 mb-4">
                  <span className="text-3xl">⚡</span>
                  <div>
                    <h3 className="font-[var(--font-display)] text-xl text-[var(--gold)]">
                      Forge Engine
                    </h3>
                    <p className="text-xs text-[var(--text-ghost)] font-mono">
                      v0.1.0-alpha
                    </p>
                  </div>
                </div>
                <p className="text-sm text-[var(--text-dim)] leading-relaxed">
                  El motor de 4 fases está listo. Conectá tu idea y dejá que los agentes
                  especializados construyan el prompt perfecto.
                </p>
                <div className="mt-5 flex gap-2">
                  <Badge variant="blue">4 fases</Badge>
                  <Badge variant="purple">162 agentes</Badge>
                </div>
              </Card>
            </div>
          </section>

          {/* Combinación de componentes */}
          <section>
            <h2 className="font-[var(--font-body)] text-xl mb-4 text-[var(--text-dim)]">
              Composición real
            </h2>
            <Card padding="lg">
              <div className="flex flex-col md:flex-row gap-6 items-start">
                <div className="flex-1 space-y-4">
                  <Input label="Idea inicial" placeholder="Ej: Tienda online de café de especialidad" />
                  <div className="flex gap-3">
                    <Badge variant="green">Ecommerce</Badge>
                    <Badge variant="blue">Shopify</Badge>
                    <Badge variant="ghost">+3 agentes</Badge>
                  </div>
                </div>
                <div className="flex flex-col gap-3 md:items-end">
                  <Button variant="primary" size="lg">
                    Iniciar Forge →
                  </Button>
                  <p className="text-xs text-[var(--text-ghost)]">
                    Fase 0 — Selección de template
                  </p>
                </div>
              </div>
            </Card>
          </section>
        </div>

        <footer className="mt-16 pt-6 border-t border-[var(--border)] text-center text-sm text-[var(--text-ghost)] font-mono">
          Prompt Forge OS — Todos los componentes listos para producción
        </footer>
      </div>
    </main>
  );
}
