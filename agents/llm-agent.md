# LLM Agent

## Role
LLM training, fine-tuning, and optimization specialist for dream interpretation.

## Responsibilities

### 1. Model Selection
- Evaluate LLM models for dream interpretation
- Test models for accuracy
- Benchmark performance
- Cost analysis
- Islamic knowledge assessment

### 2. Fine-Tuning
- Prepare training datasets
- Islamic dream interpretation corpus
- Fine-tune base models
- Validate outputs
- Continuous improvement

### 3. Prompt Engineering
- Design interpretation prompts
- Context injection strategies
- Few-shot learning examples
- Chain-of-thought prompting
- Islamic context preservation

### 4. Quality Assurance
- Interpretation accuracy testing
- Cultural sensitivity check
- Religious accuracy verification
- Hallucination detection
- Bias mitigation

### 5. Integration
- Ollama configuration
- Model deployment
- API optimization
- Response caching
- Fallback strategies

## Model Strategy

### Current Stack
- **Platform**: Ollama (local deployment)
- **Base Model**: Llama 2 7B/13B
- **Fine-tuned For**: Islamic dream interpretation
- **Context Window**: 4096 tokens

### Future Considerations
- GPT-4 for complex dreams
- Claude for nuanced interpretation
- Gemini for multimodal (images)
- Mixtral for performance

## Training Data Sources

### Islamic Dream Interpretation
1. **Classical Sources**
   - Ibn Sirin's dream interpretation
   - Imam Al-Nabulsi's work
   - Contemporary Islamic scholars

2. **Quranic References**
   - Dreams mentioned in Quran
   - Prophet's dreams
   - Righteous predecessors' dreams

3. **Hadith Collections**
   - Sahih Bukhari dream chapters
   - Sahih Muslim dream narrations
   - Other authentic collections

4. **Modern Interpretations**
   - Contemporary Islamic scholars
   - Verified interpretations
   - Community feedback

### Dataset Structure
```json
{
  "dream": "I saw myself flying over a green garden...",
  "context": {
    "emotions": ["peaceful", "happy"],
    "symbols": ["garden", "flying"],
    "time": "fajr"
  },
  "interpretation": "Flying in dreams often indicates...",
  "islamic_perspective": "In Islamic tradition...",
  "references": ["Hadith: Bukhari 6983", "Ibn Sirin: Gardens"]
}
```

## Fine-Tuning Process

### Phase 1: Data Preparation
1. Collect 10,000+ dream-interpretation pairs
2. Clean and normalize data
3. Add Islamic context
4. Validate with scholars
5. Split train/val/test (80/10/10)

### Phase 2: Model Training
1. Select base model
2. Configure LoRA/QLoRA parameters
3. Train with Islamic dataset
4. Monitor loss and perplexity
5. Validate on test set

### Phase 3: Evaluation
1. Accuracy testing
2. Islamic knowledge verification
3. Cultural sensitivity check
4. Bias detection
5. Performance benchmarks

### Phase 4: Deployment
1. Export optimized model
2. Deploy to Ollama
3. Configure API endpoints
4. Set up monitoring
5. A/B testing

## Prompt Engineering

### Base Template
```
You are an Islamic dream interpretation expert trained in classical 
Islamic dream interpretation traditions, including the works of Ibn 
Sirin, Al-Nabulsi, and other renowned scholars.

Please provide a thoughtful interpretation of the following dream 
from an Islamic perspective:

Dream: {dream_text}
Context: {emotions, symbols, time_of_day}

Provide:
1. General interpretation
2. Key symbols and their Islamic meanings
3. Spiritual guidance
4. Relevant Quranic verses or Hadith (if applicable)

Keep the interpretation balanced, hopeful, and grounded in Islamic 
teachings.
```

### Istikhara-Specific Template
```
You are an Islamic dream interpretation expert specializing in 
Istikhara (seeking guidance) dreams.

The person performed Istikhara prayer regarding: {decision_context}
They saw the following dream: {dream_text}

Provide:
1. What the dream might indicate about the decision
2. Positive and negative signs
3. Islamic guidance on how to proceed
4. Reminder about consultation with knowledgeable people
```

## Quality Metrics

### Interpretation Quality
- Accuracy: 85%+ verified by scholars
- Cultural sensitivity: 100%
- Islamic knowledge: Verified
- User satisfaction: 4.5/5 stars
- Response time: <10 seconds

### Model Performance
- Perplexity: <20
- BLEU score: >40
- Token throughput: 50+ tokens/sec
- Context retention: 95%

## Continuous Improvement

### Feedback Loop
1. Collect user ratings
2. Gather scholar reviews
3. Identify weak areas
4. Retrain with new data
5. Deploy improved model
6. Monitor improvements

### A/B Testing
- Test prompt variations
- Compare model versions
- Measure user preference
- Optimize based on data

## Ethical Guidelines

### Content Moderation
- No superstition promotion
- Avoid definitive predictions
- Balanced interpretations
- Refer complex cases to Imams
- Cultural sensitivity

### Islamic Principles
- Stick to authentic sources
- Avoid weak narrations
- Present balanced views
- Encourage consultation
- Promote good deeds

## Technical Stack

### Training
- **Framework**: Hugging Face Transformers
- **Fine-tuning**: LoRA/QLoRA
- **Compute**: GPU (NVIDIA A100/V100)
- **Storage**: S3 for datasets

### Deployment
- **Runtime**: Ollama
- **API**: FastAPI wrapper
- **Caching**: Redis
- **Monitoring**: Prometheus + Grafana

## Model Versioning

### Version Control
```
models/
├── v1.0-llama2-7b-base/
├── v1.1-llama2-7b-finetuned/
├── v2.0-llama2-13b-finetuned/
└── v2.1-llama2-13b-optimized/
```

### Deployment Strategy
- Blue-green deployment
- Gradual rollout (10% -> 50% -> 100%)
- Monitor error rates
- Quick rollback capability

---
**Agent Status**: Active
**Priority**: Critical
**Focus Areas**: Fine-tuning, Accuracy, Islamic Knowledge
