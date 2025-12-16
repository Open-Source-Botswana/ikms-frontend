'use client';
import { FolkloreRiddlesService } from "@/app/utils/supabase/supabase";
import { RiddleFormMode, RiddleFormValues, RiddleItem } from "@/lib/types/folklore";
import { AlertCircle, Plus, X } from "lucide-react";
import { useState } from "react";
import { Button } from "../../ui/button";
import { Alert, AlertDescription } from "../../ui/alert";

interface RiddleFormProps {
  mode: RiddleFormMode;
  initialData?: Partial<RiddleFormValues>;
  riddleId?: string;
  onSuccess?: (updated: RiddleItem) => void;
}

const initialState: RiddleFormValues = {
  category: 'logic',
  language: 'en',
  question: '',
  answer: '',
  context: '',
  usage: '',
  tags: [],
};

export function RiddleForm({
  mode,
  initialData,
  riddleId,
  onSuccess,
}: RiddleFormProps) {
  const [formData, setFormData] = useState<RiddleFormValues>({
    ...initialState,
    ...initialData,
  });

  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [tagsInput, setTagsInput] = useState(
  initialData?.tags?.join(', ') ?? ''
);

const normalizeTags = (input: string): string[] => {
  return input
    .split(',')
    .map(tag => tag.trim())
    .filter(Boolean);
};

  const handleChange = (
    e: React.ChangeEvent<
      HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement
    >
  ) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError(null);

    try {
      const payload: RiddleFormValues = {
        ...formData,
        tags: normalizeTags(tagsInput),
      };

      if (mode === 'create') {
        await FolkloreRiddlesService.create(payload);
      } else {
        if (!riddleId) throw new Error('Missing riddle ID');
       const updated =  await FolkloreRiddlesService.update(riddleId, payload);

        onSuccess?.(updated);
      }


    } catch (err) {
      setError(err instanceof Error ? err.message : 'Operation failed');
    } finally {
      setLoading(false);
    }
  }

    return (
    <div className="bg-white rounded-lg border p-6 mb-8 shadow-md">
      <div className="flex items-center justify-between mb-4">
            <h2 className="text-xl font-bold">
            {mode === 'create' ? 'Add New Riddle' : 'Edit Riddle'}
            </h2>
        {/* {success && (
          <div className="flex items-center gap-2 text-green-600 bg-green-50 px-3 py-1 rounded-full">
            <span>✓</span>
            <span>Riddle added successfully!</span>
          </div>
        )} */}
      </div>

      <form onSubmit={handleSubmit} className="space-y-4">
        {error && (
          <Alert variant="destructive">
            <AlertCircle className="h-4 w-4" />
            <AlertDescription>{error}</AlertDescription>
          </Alert>
        )}

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <label htmlFor="category" className="block text-sm font-medium text-gray-700 mb-1">
              Category
            </label>
            <select
              id="category"
              name="category"
              value={formData.category}
              onChange={handleChange}
              className="w-full p-2 border rounded-md focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
              required
            >
              <option value="logic">Logic</option>
              <option value="nature">Nature</option>
              <option value="wordplay">Wordplay</option>
              <option value="math">Math</option>
              <option value="everyday">Everyday</option>
              <option value="animal">Animal</option>
              <option value="food">Food</option>
            </select>
          </div>

          <div>
            <label htmlFor="language" className="block text-sm font-medium text-gray-700 mb-1">
              Language
            </label>
            <select
              id="language"
              name="language"
              value={formData.language}
              onChange={handleChange}
              className="w-full p-2 border rounded-md focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
              required
            >
              <option value="en">English</option>
              <option value="es">Spanish</option>
              <option value="fr">French</option>
              <option value="de">German</option>
              <option value="it">Italian</option>
            </select>
          </div>
        </div>

        <div>
          <label htmlFor="question" className="block text-sm font-medium text-gray-700 mb-1">
            Question *
          </label>
          <textarea
            id="question"
            name="question"
            value={formData.question}
            onChange={handleChange}
            rows={3}
            className="w-full p-2 border rounded-md focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
            placeholder="What has keys but cannot open locks?"
            required
          />
        </div>

        <div>
          <label htmlFor="answer" className="block text-sm font-medium text-gray-700 mb-1">
            Answer *
          </label>
          <input
            id="answer"
            name="answer"
            type="text"
            value={formData.answer}
            onChange={handleChange}
            className="w-full p-2 border rounded-md focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
            placeholder="piano"
            required
          />
        </div>

        <div>
          <label htmlFor="context" className="block text-sm font-medium text-gray-700 mb-1">
            Context (Optional)
          </label>
          <textarea
            id="context"
            name="context"
            value={formData.context}
            onChange={handleChange}
            rows={2}
            className="w-full p-2 border rounded-md focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
            placeholder="This riddle plays on the double meaning of 'keys' - referring to piano keys rather than door keys."
          />
        </div>

        <div>
          <label htmlFor="usage" className="block text-sm font-medium text-gray-700 mb-1">
            Usage/Example (Optional)
          </label>
          <textarea
            id="usage"
            name="usage"
            value={formData.usage}
            onChange={handleChange}
            rows={2}
            className="w-full p-2 border rounded-md focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
            placeholder="Common brain teaser used in puzzle games and team-building activities."
          />
        </div>

        <div>
          <label htmlFor="tags" className="block text-sm font-medium text-gray-700 mb-1">
            Tags (comma-separated)
          </label>
          <input
            id="tags"
            name="tags"
            type="text"
            value={tagsInput}
            onChange={(e) => setTagsInput(e.target.value)}
            className="w-full p-2 border rounded-md focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
            placeholder="music, brain-teaser, wordplay"
          />
          <p className="text-xs text-gray-500 mt-1">
            Example: music, brain-teaser, wordplay
          </p>
        </div>

        <div className="flex justify-end gap-3 pt-2">
          <button
            type="button"
            onClick={() => setFormData({
              category: 'logic',
              language: 'en',
              question: '',
              answer: '',
              context: '',
              usage: '',
              tags: [],
            })}
            className="px-4 py-2 border border-gray-300 rounded-md text-gray-700 hover:bg-gray-50"
            disabled={loading}
          >
            <X className="h-4 w-4 inline-block mr-1" />
            Clear
          </button>
          {/* <button
            type="submit"
            disabled={loading}
            className={`px-4 py-2 rounded-md flex items-center gap-2 ${
              loading
                ? 'bg-blue-300 text-white cursor-not-allowed'
                : 'bg-blue-500 text-white hover:bg-blue-600'
            }`}
          >
            {loading ? (
              <>
                <Loader2 className="h-4 w-4 animate-spin" />
                Saving...
              </>
            ) : (
              <>
                <Save className="h-4 w-4" />
                Add Riddle
              </>
            )}
          </button> */}
          <Button type="submit">
            {loading
                ? 'Saving...'
                : mode === 'create'
                ? 'Add Riddle'
                : 'Update Riddle'}
            </Button>
        </div>
      </form>
    </div>
  );
}
