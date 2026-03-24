import { useState, useEffect } from 'react'
import './App.css'

// Componente de Ovo Decorativo Animado
const FloatingEgg = ({ delay, color, size, position }: { delay: number; color: string; size: string; position: { top?: string; left?: string; right?: string; bottom?: string } }) => (
  <div 
    className="floating-egg" 
    style={{ 
      animationDelay: `${delay}s`,
      width: size,
      height: size,
      background: color,
      ...position
    }}
  >
    <div className="egg-decoration"></div>
  </div>
)

// Componente de Depoimento
const Testimonial = ({ name, text, rating }: { name: string; text: string; rating: number }) => (
  <div className="testimonial-card">
    <div className="stars">{'★'.repeat(rating)}{'☆'.repeat(5 - rating)}</div>
    <p className="testimonial-text">"{text}"</p>
    <p className="testimonial-name">— {name}</p>
  </div>
)

// Componente de Item do FAQ
const FAQItem = ({ question, answer, isOpen, onClick }: { question: string; answer: string; isOpen: boolean; onClick: () => void }) => (
  <div className={`faq-item ${isOpen ? 'open' : ''}`}>
    <button className="faq-question" onClick={onClick}>
      <span>{question}</span>
      <span className="faq-icon">{isOpen ? '−' : '+'}</span>
    </button>
    <div className="faq-answer" style={{ maxHeight: isOpen ? '200px' : '0' }}>
      <p>{answer}</p>
    </div>
  </div>
)

function App() {
  const [timeLeft, setTimeLeft] = useState({ hours: 23, minutes: 59, seconds: 59 })
  const [openFAQ, setOpenFAQ] = useState<number | null>(0)
  const [showPopup, setShowPopup] = useState(false)

  // Countdown timer
  useEffect(() => {
    const timer = setInterval(() => {
      setTimeLeft(prev => {
        if (prev.seconds > 0) return { ...prev, seconds: prev.seconds - 1 }
        if (prev.minutes > 0) return { ...prev, minutes: prev.minutes - 1, seconds: 59 }
        if (prev.hours > 0) return { ...prev, hours: prev.hours - 1, minutes: 59, seconds: 59 }
        return { hours: 23, minutes: 59, seconds: 59 }
      })
    }, 1000)
    return () => clearInterval(timer)
  }, [])

  // Exit intent popup
  useEffect(() => {
    const handleMouseLeave = (e: MouseEvent) => {
      if (e.clientY < 10 && !showPopup && !localStorage.getItem('popupShown')) {
        setShowPopup(true)
        localStorage.setItem('popupShown', 'true')
      }
    }
    document.addEventListener('mouseleave', handleMouseLeave)
    return () => document.removeEventListener('mouseleave', handleMouseLeave)
  }, [showPopup])

  const benefits = [
    { icon: '🥚', title: '50+ Receitas Exclusivas', desc: 'De ovos tradicionais aos mais criativos e inovadores' },
    { icon: '🍫', title: 'Técnicas Profissionais', desc: 'Aprenda temperagem, moldagem e decoração como um chef' },
    { icon: '💰', title: 'Renda Extra', desc: 'Transforme sua cozinha em um negócio lucrativo de Páscoa' },
    { icon: '📱', title: 'Acesso Imediato', desc: 'E-book digital disponível para download instantâneo' },
    { icon: '🎨', title: 'Fotos Passo a Passo', desc: 'Imagens detalhadas que facilitam o aprendizado' },
    { icon: '⏰', title: 'Economize Tempo', desc: 'Técnicas testadas que evitam erros comuns' }
  ]

  const testimonials = [
    { name: 'Maria S.', text: 'Fiz 50 ovos no primeiro ano e vendi tudo! Agora é minha renda extra de Páscoa.', rating: 5 },
    { name: 'Ana Paula R.', text: 'As receitas são maravilhosas! Meus filhos adoram me ajudar na cozinha agora.', rating: 5 },
    { name: 'Carla M.', text: 'Investi R$50 em materiais e lucrei R$800. Melhor investimento!', rating: 5 }
  ]

  const faqs = [
    { q: 'O e-book é indicado para iniciantes?', a: 'Sim! O guia começa do zero, ensinando desde a escolha dos chocolates até técnicas avançadas de decoração.' },
    { q: 'Quanto tempo tenho acesso ao e-book?', a: 'Acesso vitalício! Você pode baixar e consultar quantas vezes quiser.' },
    { q: 'Preciso de equipamentos caros?', a: 'Não! A maioria das receitas usa equipamentos que você já tem em casa.' },
    { q: 'Tem garantia de satisfação?', a: 'Sim! 7 dias de garantia. Se não gostar, devolvemos 100% do seu dinheiro.' }
  ]

  return (
    <div className="app">
      {/* Ovos Flutuantes Decorativos */}
      <FloatingEgg delay={0} color="linear-gradient(135deg, #FFB6C1 0%, #FF69B4 100%)" size="60px" position={{ top: '10%', left: '5%' }} />
      <FloatingEgg delay={1.5} color="linear-gradient(135deg, #98FB98 0%, #3CB371 100%)" size="45px" position={{ top: '20%', right: '8%' }} />
      <FloatingEgg delay={3} color="linear-gradient(135deg, #DDA0DD 0%, #9370DB 100%)" size="55px" position={{ bottom: '30%', left: '3%' }} />
      <FloatingEgg delay={2} color="linear-gradient(135deg, #F0E68C 0%, #FFD700 100%)" size="50px" position={{ top: '60%', right: '5%' }} />
      <FloatingEgg delay={4} color="linear-gradient(135deg, #87CEEB 0%, #4682B4 100%)" size="40px" position={{ bottom: '15%', right: '10%' }} />

      {/* Header */}
      <header className="header">
        <div className="header-content">
          <span className="logo">🐰 Páscoa Lucrativa</span>
          <a href="#comprar" className="btn-header">Quero Meu E-book</a>
        </div>
      </header>

      {/* Hero Section */}
      <section className="hero">
        <div className="hero-badge">🌸 Edição 2024 Limitada 🌸</div>
        <h1 className="hero-title">
          Aprenda a Fazer <span className="highlight">Ovos de Páscoa</span> que Vendem Sozinhos!
        </h1>
        <p className="hero-subtitle">
          O guia completo com receitas profissionais, técnicas de temperagem e dicas de vendas 
          para você lucrar nesta Páscoa — mesmo começando do zero.
        </p>
        
        <div className="countdown">
          <p>🔥 Oferta especial termina em:</p>
          <div className="timer">
            <div><span>{String(timeLeft.hours).padStart(2, '0')}</span><small>horas</small></div>
            <span className="separator">:</span>
            <div><span>{String(timeLeft.minutes).padStart(2, '0')}</span><small>min</small></div>
            <span className="separator">:</span>
            <div><span>{String(timeLeft.seconds).padStart(2, '0')}</span><small>seg</small></div>
          </div>
        </div>

        <a href="#comprar" className="btn-main">
          🥚 Quero Aprender Agora — R$ 27,90
        </a>
        <p className="guarantee-text">✅ 7 dias de garantia • Acesso imediato • Pagamento seguro</p>
      </section>

      {/* Preview Section */}
      <section className="preview">
        <div className="ebook-image-container">
          <img 
            src="/ebook-cover.png" 
            alt="E-book Páscoa Lucrativa - Capa do guia completo" 
            className="ebook-image"
          />
          <p className="ebook-image-note">Substitua por: ebook-cover.png na pasta public</p>
        </div>
        <div className="preview-text">
          <h2>Tudo que você precisa em um só lugar</h2>
          <ul className="preview-list">
            <li>📖 127 páginas de conteúdo puro</li>
            <li>📸 Mais de 200 fotos passo a passo</li>
            <li>🎥 Bônus: 3 videoaulas exclusivas</li>
            <li>📋 Planilha de custos e precificação</li>
            <li>🎁 10 modelos de embalagens editáveis</li>
          </ul>
        </div>
      </section>

      {/* Benefits Section */}
      <section className="benefits">
        <h2 className="section-title">O que você vai aprender?</h2>
        <div className="benefits-grid">
          {benefits.map((b, i) => (
            <div key={i} className="benefit-card">
              <span className="benefit-icon">{b.icon}</span>
              <h3>{b.title}</h3>
              <p>{b.desc}</p>
            </div>
          ))}
        </div>
      </section>

      {/* Social Proof */}
      <section className="social-proof">
        <div className="stats-bar">
          <div><strong>2.500+</strong><span>Alunos</span></div>
          <div><strong>50+</strong><span>Receitas</span></div>
          <div><strong>4.9★</strong><span>Avaliação</span></div>
        </div>
        
        <h2 className="section-title">O que dizem nossas alunas</h2>
        <div className="testimonials-grid">
          {testimonials.map((t, i) => (
            <Testimonial key={i} name={t.name} text={t.text} rating={t.rating} />
          ))}
        </div>
      </section>

      {/* Price Section */}
      <section id="comprar" className="pricing">
        <div className="pricing-card">
          <span className="pricing-badge">🔥 MAIS POPULAR</span>
          <h3>E-book Páscoa Lucrativa</h3>
          <div className="price-comparison">
            <span className="old-price">De R$ 97,00</span>
            <span className="new-price">R$ 27,90</span>
          </div>
          <p className="price-note">Pagamento único • Acesso vitalício</p>
          
          <ul className="pricing-features">
            <li>✓ E-book completo (127 páginas)</li>
            <li>✓ 50+ receitas detalhadas</li>
            <li>✓ 3 videoaulas bônus</li>
            <li>✓ Planilha de precificação</li>
            <li>✓ 10 modelos de embalagens</li>
            <li>✓ Suporte por email</li>
          </ul>
          
          <button className="btn-buy">
            🛒 COMPRAR AGORA — R$ 27,90
          </button>
          
          <div className="payment-icons">
            <span>💳 Cartão</span>
            <span>📱 Pix</span>
            <span>🏦 Boleto</span>
          </div>
          
          <div className="guarantee-badge">
            <span className="shield">🛡️</span>
            <div>
              <strong>Garantia de 7 Dias</strong>
              <p>Não gostou? Devolvemos seu dinheiro!</p>
            </div>
          </div>
        </div>
      </section>

      {/* FAQ Section */}
      <section className="faq">
        <h2 className="section-title">Dúvidas Frequentes</h2>
        <div className="faq-list">
          {faqs.map((faq, i) => (
            <FAQItem 
              key={i}
              question={faq.q}
              answer={faq.a}
              isOpen={openFAQ === i}
              onClick={() => setOpenFAQ(openFAQ === i ? null : i)}
            />
          ))}
        </div>
      </section>

      {/* Final CTA */}
      <section className="final-cta">
        <h2>Não deixe a Páscoa passar em branco!</h2>
        <p>Comece hoje e esteja pronta para vender ovos incríveis</p>
        <a href="#comprar" className="btn-main large">
          🐰 Quero Começar Minha Páscoa Lucrativa
        </a>
        <p className="urgency-text">⚡ Preço pode aumentar a qualquer momento</p>
      </section>

      {/* Footer */}
      <footer className="footer">
        <p>© 2024 Páscoa Lucrativa. Todos os direitos reservados.</p>
        <p className="footer-links">
          <a href="#">Termos de Uso</a> • <a href="#">Política de Privacidade</a> • <a href="#">Contato</a>
        </p>
      </footer>

      {/* Exit Intent Popup */}
      {showPopup && (
        <div className="popup-overlay" onClick={() => setShowPopup(false)}>
          <div className="popup" onClick={e => e.stopPropagation()}>
            <button className="popup-close" onClick={() => setShowPopup(false)}>×</button>
            <span className="popup-emoji">🎁</span>
            <h3>Espere! Temos um presente para você</h3>
            <p>Cadastre seu email e receba <strong>3 receitas grátis</strong> para começar!</p>
            <input type="email" placeholder="seu@email.com" />
            <button className="btn-popup">Quero Minhas Receitas Grátis</button>
          </div>
        </div>
      )}
    </div>
  )
}

export default App
