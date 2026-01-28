import { loadLabelsData } from "@/lib/load-labels"


describe('loadLabelsData', ()=>{
    it('loads valid labels JSON and returns LabelsData', async ()=>{
        const data  = await loadLabelsData();
        expect(typeof data).toBe('object')
        expect(data).not.toBeNull()
    })
})
