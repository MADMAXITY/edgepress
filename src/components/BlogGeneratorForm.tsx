'use client';

import { useState } from 'react';
import { BlogRules } from '@/types/blog';

interface BlogGeneratorFormProps {
  onSubmit: (rules: BlogRules) => void;
  isLoading: boolean;
}

export default function BlogGeneratorForm({ onSubmit, isLoading }: BlogGeneratorFormProps) {
  const [formData, setFormData] = useState<BlogRules>({
    title: '',
    slug: '',
    metaDescription: '',
    intent: 'EDUCATIONAL',
    contentType: 'Guide',
    hookType: 'Problem Mirror',
    targetKeywords: [''],
    readingGrade: 8,
    wordTarget: 1400,
    influence: ['Authority'],
    closingStyle: 'Quick Recap',
    cta: 'Book a free consultation',
    disallowPhrases: ['As an AI', 'In conclusion'],
    sections: [
      {
        id: 'hook',
        heading: '',
        summary: '',
        bullets: []
      },
      {
        id: 'context',
        heading: 'Why this matters now',
        summary: '',
        bullets: []
      }
    ],
    references: []
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSubmit(formData);
  };

  const updateKeywords = (index: number, value: string) => {
    const newKeywords = [...formData.targetKeywords];
    newKeywords[index] = value;
    setFormData({ ...formData, targetKeywords: newKeywords });
  };

  const addKeyword = () => {
    setFormData({ ...formData, targetKeywords: [...formData.targetKeywords, ''] });
  };

  const removeKeyword = (index: number) => {
    if (formData.targetKeywords.length > 1) {
      const newKeywords = formData.targetKeywords.filter((_, i) => i !== index);
      setFormData({ ...formData, targetKeywords: newKeywords });
    }
  };

  // const updateBullets = (sectionId: string, index: number, value: string) => {
  //   const newSections = formData.sections.map(section => {
  //     if (section.id === sectionId) {
  //       const newBullets = [...section.bullets];
  //       newBullets[index] = value;
  //       return { ...section, bullets: newBullets };
  //     }
  //     return section;
  //   });
  //   setFormData({ ...formData, sections: newSections });
  // };

  return (
    <div className="bg-white rounded-lg shadow-md p-6">
      <h2 className="text-2xl font-semibold mb-6">Blog Configuration</h2>

      <form onSubmit={handleSubmit} className="space-y-6">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Title *
            </label>
            <input
              type="text"
              required
              value={formData.title}
              onChange={(e) => setFormData({ ...formData, title: e.target.value })}
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
              placeholder="AI Business Transformation Guide"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Slug *
            </label>
            <input
              type="text"
              required
              value={formData.slug}
              onChange={(e) => setFormData({ ...formData, slug: e.target.value })}
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
              placeholder="ai-business-transformation-guide"
            />
          </div>
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Meta Description *
          </label>
          <textarea
            required
            value={formData.metaDescription}
            onChange={(e) => setFormData({ ...formData, metaDescription: e.target.value })}
            className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
            rows={3}
            placeholder="Learn how AI can transform your business operations and drive growth in 2024."
          />
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Intent *
            </label>
            <select
              value={formData.intent}
              onChange={(e) => setFormData({ ...formData, intent: e.target.value as 'EDUCATIONAL' | 'TRANSACTIONAL' | 'PROOF-BASED' | 'AUTHORITY-BUILDING' })}
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
            >
              <option value="EDUCATIONAL">EDUCATIONAL</option>
              <option value="TRANSACTIONAL">TRANSACTIONAL</option>
              <option value="PROOF-BASED">PROOF-BASED</option>
              <option value="AUTHORITY-BUILDING">AUTHORITY-BUILDING</option>
            </select>
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Content Type *
            </label>
            <input
              type="text"
              value={formData.contentType}
              onChange={(e) => setFormData({ ...formData, contentType: e.target.value })}
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
              placeholder="Guide, Listicle, Checklist, etc."
            />
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Hook Type *
            </label>
            <select
              value={formData.hookType}
              onChange={(e) => setFormData({ ...formData, hookType: e.target.value })}
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
            >
              <option value="Problem Mirror">Problem Mirror</option>
              <option value="Curiosity Gap">Curiosity Gap</option>
              <option value="Bold Claim">Bold Claim</option>
              <option value="Stat Punch">Stat Punch</option>
              <option value="Challenge">Challenge</option>
              <option value="Future Vision">Future Vision</option>
              <option value="Mini Story">Mini Story</option>
            </select>
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Closing Style *
            </label>
            <select
              value={formData.closingStyle}
              onChange={(e) => setFormData({ ...formData, closingStyle: e.target.value })}
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
            >
              <option value="Quick Recap">Quick Recap</option>
              <option value="Emotional Close">Emotional Close</option>
              <option value="Hard CTA">Hard CTA</option>
              <option value="Soft CTA">Soft CTA</option>
            </select>
          </div>
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Target Keywords
          </label>
          {formData.targetKeywords.map((keyword, index) => (
            <div key={index} className="flex gap-2 mb-2">
              <input
                type="text"
                value={keyword}
                onChange={(e) => updateKeywords(index, e.target.value)}
                className="flex-1 px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                placeholder={`Keyword ${index + 1}`}
              />
              {formData.targetKeywords.length > 1 && (
                <button
                  type="button"
                  onClick={() => removeKeyword(index)}
                  className="px-3 py-2 bg-red-500 text-white rounded-md hover:bg-red-600"
                >
                  ×
                </button>
              )}
            </div>
          ))}
          <button
            type="button"
            onClick={addKeyword}
            className="mt-2 px-4 py-2 bg-gray-200 text-gray-700 rounded-md hover:bg-gray-300"
          >
            + Add Keyword
          </button>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Reading Grade Level
            </label>
            <select
              value={formData.readingGrade}
              onChange={(e) => setFormData({ ...formData, readingGrade: parseInt(e.target.value) })}
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
            >
              <option value={6}>Grade 6</option>
              <option value={7}>Grade 7</option>
              <option value={8}>Grade 8</option>
              <option value={9}>Grade 9</option>
              <option value={10}>Grade 10</option>
              <option value={11}>Grade 11</option>
              <option value={12}>Grade 12</option>
            </select>
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Word Target
            </label>
            <input
              type="number"
              value={formData.wordTarget}
              onChange={(e) => setFormData({ ...formData, wordTarget: parseInt(e.target.value) })}
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
              min="500"
              max="5000"
            />
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Influence Principles
            </label>
            <select
              multiple
              value={formData.influence}
              onChange={(e) => {
                const selected = Array.from(e.target.selectedOptions).map(option => option.value);
                setFormData({ ...formData, influence: selected });
              }}
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 h-32"
            >
              <option value="Authority">Authority</option>
              <option value="Social Proof">Social Proof</option>
              <option value="Scarcity">Scarcity</option>
              <option value="Urgency">Urgency</option>
              <option value="Reciprocity">Reciprocity</option>
              <option value="Consistency">Consistency</option>
              <option value="Liking">Liking</option>
              <option value="Identity/Status">Identity/Status</option>
            </select>
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Call to Action *
            </label>
            <input
              type="text"
              required
              value={formData.cta}
              onChange={(e) => setFormData({ ...formData, cta: e.target.value })}
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
              placeholder="Book a free consultation"
            />
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Disallowed Phrases
            </label>
            <input
              type="text"
              value={formData.disallowPhrases.join(', ')}
              onChange={(e) => setFormData({
                ...formData,
                disallowPhrases: e.target.value.split(',').map(p => p.trim())
              })}
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
              placeholder="As an AI, In conclusion, etc."
            />
          </div>
        </div>

        <button
          type="submit"
          disabled={isLoading}
          className="w-full px-6 py-3 bg-blue-600 text-white font-medium rounded-md hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 disabled:opacity-50"
        >
          {isLoading ? 'Generating...' : 'Generate Blog Post'}
        </button>
      </form>
    </div>
  );
}