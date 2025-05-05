import { Card } from '@/components/ui/Card'

import { Button } from '@/components/ui/Button'

export default function CustomerInfo() {
    return (
        <Card>
            {/* Header */}
            <div className="flex justify-between items-center mb-4">
                <h2 className="text-lg font-semibold">
                    Add new inquiry{' '}
                    <span className="text-gray-400 text-sm">#5B7435</span>
                </h2>
            </div>

            {/* Inquirer Info */}
            <div className="flex items-start space-x-4 mb-6">
                <div className="w-12 h-12 bg-gray-200 rounded-full flex items-center justify-center font-semibold text-gray-600">
                    DB
                </div>
                <div>
                    <p className="font-medium">Danica Bruschke</p>
                    <p className="text-sm text-gray-500">danica@honeywell.io</p>
                    <p className="text-sm text-gray-500">732-924-7882</p>
                    <p className="text-sm text-gray-500">Honeywell</p>
                </div>
            </div>

            {/* Description */}
            <div className="mb-4">
                <label className="block text-sm font-medium mb-1">Notes</label>
                <textarea
                    className="w-full p-2 border rounded-md text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
                    rows={3}
                    placeholder="Enter Notes"
                />
            </div>

            {/* Status + Assigned */}
            <div className="grid grid-cols-2 gap-4 mb-4">
                <div>
                    <label className="block text-sm font-medium mb-1">
                        Status
                    </label>
                    <select className="w-full p-2 border rounded-md text-sm focus:outline-none focus:ring-2 focus:ring-blue-500">
                        <option value="new">New</option>
                        <option value="pending">Pending</option>
                        <option value="resolved">Resolved</option>
                    </select>
                </div>
                <div>
                    <label className="block text-sm font-medium mb-1">
                        Assigned to
                    </label>
                    <select className="w-full p-2 border rounded-md text-sm focus:outline-none focus:ring-2 focus:ring-blue-500">
                        <option value="danica">Danica Bruschke</option>
                        <option value="alex">Alex Morgan</option>
                    </select>
                </div>
            </div>

            {/* Service */}
            <div className="mb-6">
                <label className="block text-sm font-medium mb-1">
                    Service
                </label>
                <input
                    type="text"
                    className="w-full p-2 border rounded-md text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
                    placeholder="Air India – COK to DOH"
                />
            </div>

            {/* Action Buttons */}
            <div className="flex justify-end space-x-2">
                <Button variant='solid'>Update</Button>
                
            </div>
        </Card>
    )
}
