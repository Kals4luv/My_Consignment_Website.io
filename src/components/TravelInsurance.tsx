import React, { useState } from 'react';
import { X, Shield, Plane, Heart, Briefcase, Car, Home, Clock, CheckCircle, AlertTriangle, CreditCard, Download, FileText, Phone, Mail, Calendar, DollarSign, Users, MapPin } from 'lucide-react';

interface InsurancePolicy {
  id: string;
  name: string;
  type: 'basic' | 'standard' | 'premium';
  price: number;
  duration: string;
  coverage: {
    medical: number;
    tripCancellation: number;
    baggage: number;
    flightDelay: number;
    emergency: number;
  };
  features: string[];
  popular?: boolean;
}

interface Claim {
  id: string;
  policyNumber: string;
  type: string;
  amount: number;
  status: 'pending' | 'approved' | 'rejected' | 'processing';
  dateSubmitted: string;
  description: string;
  documents: string[];
}

interface TravelInsuranceProps {
  onClose: () => void;
}

const insurancePolicies: InsurancePolicy[] = [
  {
    id: '1',
    name: 'Basic Protection',
    type: 'basic',
    price: 29,
    duration: 'Up to 7 days',
    coverage: {
      medical: 50000,
      tripCancellation: 5000,
      baggage: 1000,
      flightDelay: 500,
      emergency: 25000
    },
    features: [
      'Emergency Medical Coverage',
      'Trip Cancellation Protection',
      'Lost Baggage Coverage',
      '24/7 Emergency Assistance',
      'Flight Delay Compensation'
    ]
  },
  {
    id: '2',
    name: 'Standard Coverage',
    type: 'standard',
    price: 59,
    duration: 'Up to 30 days',
    coverage: {
      medical: 100000,
      tripCancellation: 10000,
      baggage: 2500,
      flightDelay: 1000,
      emergency: 50000
    },
    features: [
      'Enhanced Medical Coverage',
      'Trip Interruption Protection',
      'Baggage & Personal Items',
      'Rental Car Coverage',
      'Adventure Sports Coverage',
      'Pre-existing Conditions',
      '24/7 Concierge Service'
    ],
    popular: true
  },
  {
    id: '3',
    name: 'Premium Shield',
    type: 'premium',
    price: 99,
    duration: 'Up to 90 days',
    coverage: {
      medical: 250000,
      tripCancellation: 25000,
      baggage: 5000,
      flightDelay: 2000,
      emergency: 100000
    },
    features: [
      'Maximum Medical Protection',
      'Cancel for Any Reason',
      'Premium Baggage Coverage',
      'Business Equipment Protection',
      'High-Risk Activities',
      'Family Coverage Options',
      'Priority Claims Processing',
      'Travel Concierge Services'
    ]
  }
];

const mockClaims: Claim[] = [
  {
    id: '1',
    policyNumber: 'TI-2024-001234',
    type: 'Medical Emergency',
    amount: 2500,
    status: 'approved',
    dateSubmitted: '2024-01-10',
    description: 'Emergency medical treatment in Paris',
    documents: ['medical_report.pdf', 'receipts.pdf']
  },
  {
    id: '2',
    policyNumber: 'TI-2024-001235',
    type: 'Flight Delay',
    amount: 800,
    status: 'processing',
    dateSubmitted: '2024-01-15',
    description: '12-hour flight delay due to weather',
    documents: ['flight_confirmation.pdf', 'delay_certificate.pdf']
  },
  {
    id: '3',
    policyNumber: 'TI-2024-001236',
    type: 'Lost Baggage',
    amount: 1200,
    status: 'pending',
    dateSubmitted: '2024-01-20',
    description: 'Baggage lost during connection in London',
    documents: ['baggage_report.pdf', 'item_list.pdf']
  }
];

export const TravelInsurance: React.FC<TravelInsuranceProps> = ({ onClose }) => {
  const [activeTab, setActiveTab] = useState<'policies' | 'claims' | 'purchase'>('policies');
  const [selectedPolicy, setSelectedPolicy] = useState<InsurancePolicy | null>(null);
  const [showPurchaseModal, setShowPurchaseModal] = useState(false);
  const [showClaimModal, setShowClaimModal] = useState(false);
  const [purchaseStep, setPurchaseStep] = useState(1);
  const [claims, setClaims] = useState<Claim[]>(mockClaims);
  
  const [travelDetails, setTravelDetails] = useState({
    destination: '',
    departureDate: '',
    returnDate: '',
    travelers: 1,
    tripCost: 0
  });

  const [personalInfo, setPersonalInfo] = useState({
    firstName: '',
    lastName: '',
    email: '',
    phone: '',
    dateOfBirth: '',
    address: ''
  });

  const [newClaim, setNewClaim] = useState({
    type: '',
    amount: 0,
    description: '',
    incidentDate: ''
  });

  const getStatusIcon = (status: string) => {
    switch (status) {
      case 'approved': return <CheckCircle className="h-5 w-5 text-green-500" />;
      case 'processing': return <Clock className="h-5 w-5 text-orange-500" />;
      case 'pending': return <AlertTriangle className="h-5 w-5 text-yellow-500" />;
      case 'rejected': return <X className="h-5 w-5 text-red-500" />;
      default: return null;
    }
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'approved': return 'bg-green-100 text-green-800';
      case 'processing': return 'bg-orange-100 text-orange-800';
      case 'pending': return 'bg-yellow-100 text-yellow-800';
      case 'rejected': return 'bg-red-100 text-red-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  const handlePurchase = (policy: InsurancePolicy) => {
    setSelectedPolicy(policy);
    setShowPurchaseModal(true);
    setPurchaseStep(1);
  };

  const handlePurchaseSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (purchaseStep < 3) {
      setPurchaseStep(purchaseStep + 1);
    } else {
      alert('Travel insurance purchased successfully! You will receive your policy documents via email.');
      setShowPurchaseModal(false);
      setPurchaseStep(1);
    }
  };

  const handleClaimSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const claim: Claim = {
      id: (claims.length + 1).toString(),
      policyNumber: `TI-2024-00${1237 + claims.length}`,
      type: newClaim.type,
      amount: newClaim.amount,
      status: 'pending',
      dateSubmitted: new Date().toISOString().split('T')[0],
      description: newClaim.description,
      documents: []
    };
    setClaims([...claims, claim]);
    setShowClaimModal(false);
    setNewClaim({ type: '', amount: 0, description: '', incidentDate: '' });
    alert('Claim submitted successfully! We will review your claim and contact you within 2-3 business days.');
  };

  const downloadPolicy = () => {
    alert('Policy document downloaded! Check your downloads folder.');
  };

  const contactSupport = () => {
    alert('Connecting you to our 24/7 support team...');
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50 backdrop-blur-sm">
      <div className="bg-white rounded-2xl max-w-6xl w-full max-h-[95vh] overflow-y-auto relative shadow-2xl">
        <button
          onClick={onClose}
          className="absolute top-4 right-4 text-gray-400 hover:text-blue-600 transition-colors z-10 bg-white rounded-full p-2 shadow-lg"
        >
          <X className="h-6 w-6" />
        </button>
        
        <div className="p-8">
          <div className="text-center mb-8">
            <div className="flex items-center justify-center mb-4">
              <Shield className="h-12 w-12 text-blue-600 mr-3" />
              <h1 className="text-3xl font-bold bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
                Travel Insurance
              </h1>
            </div>
            <p className="text-xl text-gray-700">Protect your journey with comprehensive travel coverage</p>
          </div>

          {/* Navigation Tabs */}
          <div className="flex justify-center mb-8">
            <div className="bg-gray-100 rounded-full p-1 flex space-x-1">
              <button
                onClick={() => setActiveTab('policies')}
                className={`px-6 py-3 rounded-full font-medium transition-all ${
                  activeTab === 'policies'
                    ? 'bg-gradient-to-r from-blue-500 to-purple-600 text-white shadow-lg'
                    : 'text-gray-600 hover:text-blue-600'
                }`}
              >
                <Shield className="h-4 w-4 inline mr-2" />
                Policies
              </button>
              <button
                onClick={() => setActiveTab('claims')}
                className={`px-6 py-3 rounded-full font-medium transition-all ${
                  activeTab === 'claims'
                    ? 'bg-gradient-to-r from-blue-500 to-purple-600 text-white shadow-lg'
                    : 'text-gray-600 hover:text-blue-600'
                }`}
              >
                <FileText className="h-4 w-4 inline mr-2" />
                Claims
              </button>
            </div>
          </div>

          {/* Policies Tab */}
          {activeTab === 'policies' && (
            <div>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
                {insurancePolicies.map(policy => (
                  <div 
                    key={policy.id} 
                    className={`bg-gradient-to-br from-blue-50 to-purple-50 rounded-2xl p-6 border-2 transition-all transform hover:scale-105 hover:shadow-2xl ${
                      policy.popular 
                        ? 'border-blue-500 ring-2 ring-blue-200' 
                        : 'border-blue-200 hover:border-blue-400'
                    }`}
                  >
                    {policy.popular && (
                      <div className="bg-gradient-to-r from-blue-500 to-purple-600 text-white px-4 py-1 rounded-full text-sm font-bold text-center mb-4">
                        Most Popular
                      </div>
                    )}
                    
                    <div className="text-center mb-6">
                      <h3 className="text-2xl font-bold bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent mb-2">
                        {policy.name}
                      </h3>
                      <div className="text-4xl font-bold text-gray-800 mb-2">
                        ${policy.price}
                      </div>
                      <p className="text-gray-600">{policy.duration}</p>
                    </div>

                    <div className="space-y-4 mb-6">
                      <div className="bg-white rounded-lg p-4">
                        <h4 className="font-semibold text-gray-800 mb-3">Coverage Limits</h4>
                        <div className="space-y-2 text-sm">
                          <div className="flex justify-between">
                            <span>Medical Emergency:</span>
                            <span className="font-semibold">${policy.coverage.medical.toLocaleString()}</span>
                          </div>
                          <div className="flex justify-between">
                            <span>Trip Cancellation:</span>
                            <span className="font-semibold">${policy.coverage.tripCancellation.toLocaleString()}</span>
                          </div>
                          <div className="flex justify-between">
                            <span>Baggage Loss:</span>
                            <span className="font-semibold">${policy.coverage.baggage.toLocaleString()}</span>
                          </div>
                          <div className="flex justify-between">
                            <span>Flight Delay:</span>
                            <span className="font-semibold">${policy.coverage.flightDelay.toLocaleString()}</span>
                          </div>
                        </div>
                      </div>

                      <div className="space-y-2">
                        {policy.features.map((feature, index) => (
                          <div key={index} className="flex items-center text-sm">
                            <CheckCircle className="h-4 w-4 text-green-500 mr-2 flex-shrink-0" />
                            <span>{feature}</span>
                          </div>
                        ))}
                      </div>
                    </div>

                    <button
                      onClick={() => handlePurchase(policy)}
                      className="w-full bg-gradient-to-r from-blue-500 to-purple-600 text-white py-3 rounded-full hover:from-blue-600 hover:to-purple-700 transition-all transform hover:scale-105 font-semibold shadow-lg"
                    >
                      Select Plan
                    </button>
                  </div>
                ))}
              </div>

              {/* Additional Information */}
              <div className="bg-gradient-to-r from-blue-50 to-purple-50 rounded-2xl p-6 border-2 border-blue-200">
                <h3 className="text-xl font-bold bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent mb-4">
                  Why Choose Our Travel Insurance?
                </h3>
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                  <div className="text-center">
                    <Heart className="h-12 w-12 text-red-500 mx-auto mb-3" />
                    <h4 className="font-semibold mb-2">Medical Coverage</h4>
                    <p className="text-sm text-gray-600">Comprehensive medical and emergency coverage worldwide</p>
                  </div>
                  <div className="text-center">
                    <Plane className="h-12 w-12 text-blue-500 mx-auto mb-3" />
                    <h4 className="font-semibold mb-2">Trip Protection</h4>
                    <p className="text-sm text-gray-600">Cancel or interrupt your trip for covered reasons</p>
                  </div>
                  <div className="text-center">
                    <Briefcase className="h-12 w-12 text-purple-500 mx-auto mb-3" />
                    <h4 className="font-semibold mb-2">Baggage Coverage</h4>
                    <p className="text-sm text-gray-600">Protection for lost, stolen, or damaged belongings</p>
                  </div>
                  <div className="text-center">
                    <Clock className="h-12 w-12 text-green-500 mx-auto mb-3" />
                    <h4 className="font-semibold mb-2">24/7 Support</h4>
                    <p className="text-sm text-gray-600">Round-the-clock emergency assistance anywhere</p>
                  </div>
                </div>
              </div>
            </div>
          )}

          {/* Claims Tab */}
          {activeTab === 'claims' && (
            <div>
              <div className="flex justify-between items-center mb-6">
                <h2 className="text-2xl font-bold bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
                  Manage Claims
                </h2>
                <button
                  onClick={() => setShowClaimModal(true)}
                  className="bg-gradient-to-r from-green-500 to-emerald-600 text-white px-6 py-3 rounded-full hover:from-green-600 hover:to-emerald-700 transition-all transform hover:scale-105 font-semibold shadow-lg flex items-center space-x-2"
                >
                  <FileText className="h-4 w-4" />
                  <span>File New Claim</span>
                </button>
              </div>

              <div className="space-y-4">
                {claims.map(claim => (
                  <div key={claim.id} className="bg-gradient-to-r from-blue-50 to-purple-50 rounded-2xl p-6 border-2 border-blue-200">
                    <div className="flex flex-col lg:flex-row justify-between items-start lg:items-center gap-4">
                      <div className="flex-1">
                        <div className="flex items-center gap-3 mb-2">
                          <h3 className="text-xl font-bold bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
                            {claim.policyNumber}
                          </h3>
                          <span className={`px-3 py-1 rounded-full text-sm font-semibold flex items-center gap-1 ${getStatusColor(claim.status)}`}>
                            {getStatusIcon(claim.status)}
                            {claim.status.charAt(0).toUpperCase() + claim.status.slice(1)}
                          </span>
                        </div>
                        
                        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 text-sm">
                          <div>
                            <span className="font-semibold text-gray-700">Claim Type:</span>
                            <div>{claim.type}</div>
                          </div>
                          <div>
                            <span className="font-semibold text-gray-700">Amount:</span>
                            <div className="text-lg font-bold text-green-600">${claim.amount.toLocaleString()}</div>
                          </div>
                          <div>
                            <span className="font-semibold text-gray-700">Date Submitted:</span>
                            <div>{new Date(claim.dateSubmitted).toLocaleDateString()}</div>
                          </div>
                        </div>
                        
                        <div className="mt-3">
                          <span className="font-semibold text-gray-700">Description:</span>
                          <p className="text-gray-600 mt-1">{claim.description}</p>
                        </div>

                        {claim.documents.length > 0 && (
                          <div className="mt-3">
                            <span className="font-semibold text-gray-700">Documents:</span>
                            <div className="flex flex-wrap gap-2 mt-1">
                              {claim.documents.map((doc, index) => (
                                <span key={index} className="bg-white px-3 py-1 rounded-full text-xs border border-blue-200">
                                  {doc}
                                </span>
                              ))}
                            </div>
                          </div>
                        )}
                      </div>

                      <div className="flex flex-col gap-2">
                        <button className="bg-gradient-to-r from-blue-500 to-purple-600 text-white px-4 py-2 rounded-full hover:from-blue-600 hover:to-purple-700 transition-all transform hover:scale-105 flex items-center space-x-2 text-sm font-medium">
                          <Download className="h-4 w-4" />
                          <span>Download</span>
                        </button>
                        <button 
                          onClick={contactSupport}
                          className="bg-gradient-to-r from-green-500 to-emerald-600 text-white px-4 py-2 rounded-full hover:from-green-600 hover:to-emerald-700 transition-all transform hover:scale-105 flex items-center space-x-2 text-sm font-medium"
                        >
                          <Phone className="h-4 w-4" />
                          <span>Contact</span>
                        </button>
                      </div>
                    </div>
                  </div>
                ))}
              </div>

              {claims.length === 0 && (
                <div className="text-center py-12">
                  <FileText className="h-16 w-16 text-gray-400 mx-auto mb-4" />
                  <h3 className="text-xl font-semibold text-gray-600 mb-2">No claims found</h3>
                  <p className="text-gray-500 mb-6">You haven't filed any insurance claims yet.</p>
                  <button
                    onClick={() => setShowClaimModal(true)}
                    className="bg-gradient-to-r from-green-500 to-emerald-600 text-white px-6 py-3 rounded-full hover:from-green-600 hover:to-emerald-700 transition-all transform hover:scale-105 font-medium"
                  >
                    File Your First Claim
                  </button>
                </div>
              )}
            </div>
          )}

          {/* Emergency Contact Information */}
          <div className="mt-8 bg-gradient-to-r from-red-50 to-orange-50 rounded-2xl p-6 border-2 border-red-200">
            <h3 className="text-xl font-bold text-red-800 mb-4 flex items-center">
              <AlertTriangle className="h-6 w-6 mr-2" />
              Emergency Assistance
            </h3>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <div className="text-center">
                <Phone className="h-8 w-8 text-red-600 mx-auto mb-2" />
                <div className="font-semibold">24/7 Hotline</div>
                <div className="text-red-600 font-bold">+1-800-TRAVEL-911</div>
              </div>
              <div className="text-center">
                <Mail className="h-8 w-8 text-red-600 mx-auto mb-2" />
                <div className="font-semibold">Emergency Email</div>
                <div className="text-red-600 font-bold">emergency@kalsxprezz.com</div>
              </div>
              <div className="text-center">
                <Clock className="h-8 w-8 text-red-600 mx-auto mb-2" />
                <div className="font-semibold">Response Time</div>
                <div className="text-red-600 font-bold">Within 1 Hour</div>
              </div>
            </div>
          </div>
        </div>

        {/* Purchase Modal */}
        {showPurchaseModal && selectedPolicy && (
          <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-60">
            <div className="bg-white rounded-2xl max-w-2xl w-full max-h-[90vh] overflow-y-auto relative shadow-2xl">
              <button
                onClick={() => setShowPurchaseModal(false)}
                className="absolute top-4 right-4 text-gray-400 hover:text-blue-600 transition-colors z-10 bg-white rounded-full p-2 shadow-lg"
              >
                <X className="h-6 w-6" />
              </button>
              
              <div className="p-8">
                <div className="flex items-center justify-between mb-6">
                  <h2 className="text-2xl font-bold bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
                    Purchase Insurance
                  </h2>
                  <div className="flex space-x-2">
                    {[1, 2, 3].map(step => (
                      <div
                        key={step}
                        className={`w-8 h-8 rounded-full flex items-center justify-center text-sm font-semibold ${
                          step <= purchaseStep
                            ? 'bg-gradient-to-r from-blue-500 to-purple-600 text-white'
                            : 'bg-gray-200 text-gray-500'
                        }`}
                      >
                        {step}
                      </div>
                    ))}
                  </div>
                </div>

                {/* Policy Summary */}
                <div className="bg-gradient-to-r from-blue-50 to-purple-50 rounded-2xl p-4 mb-6 border-2 border-blue-200">
                  <h3 className="font-semibold text-lg mb-2">{selectedPolicy.name}</h3>
                  <div className="flex justify-between items-center">
                    <div>
                      <div className="text-sm text-gray-600">Coverage Duration: {selectedPolicy.duration}</div>
                      <div className="text-sm text-gray-600">Medical Coverage: ${selectedPolicy.coverage.medical.toLocaleString()}</div>
                    </div>
                    <div className="text-right">
                      <div className="text-2xl font-bold bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
                        ${selectedPolicy.price}
                      </div>
                    </div>
                  </div>
                </div>

                <form onSubmit={handlePurchaseSubmit}>
                  {purchaseStep === 1 && (
                    <div className="space-y-4">
                      <h3 className="text-lg font-semibold mb-4">Travel Details</h3>
                      <div className="grid grid-cols-2 gap-4">
                        <div>
                          <label className="block text-sm font-medium text-gray-700 mb-1">Destination</label>
                          <div className="relative">
                            <MapPin className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-blue-400" />
                            <input
                              type="text"
                              value={travelDetails.destination}
                              onChange={(e) => setTravelDetails({...travelDetails, destination: e.target.value})}
                              className="w-full pl-10 pr-4 py-3 border-2 border-blue-200 rounded-full focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all"
                              placeholder="Enter destination"
                              required
                            />
                          </div>
                        </div>
                        <div>
                          <label className="block text-sm font-medium text-gray-700 mb-1">Number of Travelers</label>
                          <div className="relative">
                            <Users className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-blue-400" />
                            <select
                              value={travelDetails.travelers}
                              onChange={(e) => setTravelDetails({...travelDetails, travelers: parseInt(e.target.value)})}
                              className="w-full pl-10 pr-4 py-3 border-2 border-blue-200 rounded-full focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all"
                            >
                              {[1,2,3,4,5,6].map(num => (
                                <option key={num} value={num}>{num} {num === 1 ? 'Traveler' : 'Travelers'}</option>
                              ))}
                            </select>
                          </div>
                        </div>
                      </div>
                      <div className="grid grid-cols-2 gap-4">
                        <div>
                          <label className="block text-sm font-medium text-gray-700 mb-1">Departure Date</label>
                          <div className="relative">
                            <Calendar className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-blue-400" />
                            <input
                              type="date"
                              value={travelDetails.departureDate}
                              onChange={(e) => setTravelDetails({...travelDetails, departureDate: e.target.value})}
                              className="w-full pl-10 pr-4 py-3 border-2 border-blue-200 rounded-full focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all"
                              required
                            />
                          </div>
                        </div>
                        <div>
                          <label className="block text-sm font-medium text-gray-700 mb-1">Return Date</label>
                          <div className="relative">
                            <Calendar className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-blue-400" />
                            <input
                              type="date"
                              value={travelDetails.returnDate}
                              onChange={(e) => setTravelDetails({...travelDetails, returnDate: e.target.value})}
                              className="w-full pl-10 pr-4 py-3 border-2 border-blue-200 rounded-full focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all"
                              required
                            />
                          </div>
                        </div>
                      </div>
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1">Total Trip Cost ($)</label>
                        <div className="relative">
                          <DollarSign className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-blue-400" />
                          <input
                            type="number"
                            value={travelDetails.tripCost}
                            onChange={(e) => setTravelDetails({...travelDetails, tripCost: parseInt(e.target.value)})}
                            className="w-full pl-10 pr-4 py-3 border-2 border-blue-200 rounded-full focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all"
                            placeholder="Enter total trip cost"
                            required
                          />
                        </div>
                      </div>
                    </div>
                  )}

                  {purchaseStep === 2 && (
                    <div className="space-y-4">
                      <h3 className="text-lg font-semibold mb-4">Personal Information</h3>
                      <div className="grid grid-cols-2 gap-4">
                        <div>
                          <label className="block text-sm font-medium text-gray-700 mb-1">First Name</label>
                          <input
                            type="text"
                            value={personalInfo.firstName}
                            onChange={(e) => setPersonalInfo({...personalInfo, firstName: e.target.value})}
                            className="w-full px-4 py-3 border-2 border-blue-200 rounded-full focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all"
                            required
                          />
                        </div>
                        <div>
                          <label className="block text-sm font-medium text-gray-700 mb-1">Last Name</label>
                          <input
                            type="text"
                            value={personalInfo.lastName}
                            onChange={(e) => setPersonalInfo({...personalInfo, lastName: e.target.value})}
                            className="w-full px-4 py-3 border-2 border-blue-200 rounded-full focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all"
                            required
                          />
                        </div>
                      </div>
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1">Email</label>
                        <input
                          type="email"
                          value={personalInfo.email}
                          onChange={(e) => setPersonalInfo({...personalInfo, email: e.target.value})}
                          className="w-full px-4 py-3 border-2 border-blue-200 rounded-full focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all"
                          required
                        />
                      </div>
                      <div className="grid grid-cols-2 gap-4">
                        <div>
                          <label className="block text-sm font-medium text-gray-700 mb-1">Phone</label>
                          <input
                            type="tel"
                            value={personalInfo.phone}
                            onChange={(e) => setPersonalInfo({...personalInfo, phone: e.target.value})}
                            className="w-full px-4 py-3 border-2 border-blue-200 rounded-full focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all"
                            required
                          />
                        </div>
                        <div>
                          <label className="block text-sm font-medium text-gray-700 mb-1">Date of Birth</label>
                          <input
                            type="date"
                            value={personalInfo.dateOfBirth}
                            onChange={(e) => setPersonalInfo({...personalInfo, dateOfBirth: e.target.value})}
                            className="w-full px-4 py-3 border-2 border-blue-200 rounded-full focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all"
                            required
                          />
                        </div>
                      </div>
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1">Address</label>
                        <input
                          type="text"
                          value={personalInfo.address}
                          onChange={(e) => setPersonalInfo({...personalInfo, address: e.target.value})}
                          className="w-full px-4 py-3 border-2 border-blue-200 rounded-full focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all"
                          placeholder="Enter your full address"
                          required
                        />
                      </div>
                    </div>
                  )}

                  {purchaseStep === 3 && (
                    <div className="space-y-4">
                      <h3 className="text-lg font-semibold mb-4">Payment Information</h3>
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1">Card Number</label>
                        <input
                          type="text"
                          placeholder="1234 5678 9012 3456"
                          className="w-full px-4 py-3 border-2 border-blue-200 rounded-full focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all"
                          required
                        />
                      </div>
                      <div className="grid grid-cols-2 gap-4">
                        <div>
                          <label className="block text-sm font-medium text-gray-700 mb-1">Expiry Date</label>
                          <input
                            type="text"
                            placeholder="MM/YY"
                            className="w-full px-4 py-3 border-2 border-blue-200 rounded-full focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all"
                            required
                          />
                        </div>
                        <div>
                          <label className="block text-sm font-medium text-gray-700 mb-1">CVV</label>
                          <input
                            type="text"
                            placeholder="123"
                            className="w-full px-4 py-3 border-2 border-blue-200 rounded-full focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all"
                            required
                          />
                        </div>
                      </div>
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1">Cardholder Name</label>
                        <input
                          type="text"
                          className="w-full px-4 py-3 border-2 border-blue-200 rounded-full focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all"
                          required
                        />
                      </div>
                      
                      {/* Final Summary */}
                      <div className="bg-gradient-to-r from-green-50 to-emerald-50 rounded-2xl p-6 border-2 border-green-200 mt-6">
                        <h4 className="font-semibold text-green-800 mb-3">Purchase Summary</h4>
                        <div className="space-y-2 text-sm">
                          <div className="flex justify-between">
                            <span>Policy:</span>
                            <span className="font-semibold">{selectedPolicy.name}</span>
                          </div>
                          <div className="flex justify-between">
                            <span>Travelers:</span>
                            <span className="font-semibold">{travelDetails.travelers}</span>
                          </div>
                          <div className="flex justify-between">
                            <span>Destination:</span>
                            <span className="font-semibold">{travelDetails.destination}</span>
                          </div>
                          <div className="border-t pt-2 mt-2">
                            <div className="flex justify-between text-lg font-bold">
                              <span>Total:</span>
                              <span className="text-green-600">${selectedPolicy.price * travelDetails.travelers}</span>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  )}

                  <div className="flex justify-between mt-8">
                    {purchaseStep > 1 && (
                      <button
                        type="button"
                        onClick={() => setPurchaseStep(purchaseStep - 1)}
                        className="bg-gray-300 text-gray-700 px-6 py-3 rounded-full hover:bg-gray-400 transition-all"
                      >
                        Back
                      </button>
                    )}
                    <button
                      type="submit"
                      className="bg-gradient-to-r from-blue-500 to-purple-600 text-white px-8 py-3 rounded-full hover:from-blue-600 hover:to-purple-700 transition-all transform hover:scale-105 font-semibold shadow-lg ml-auto flex items-center space-x-2"
                    >
                      <CreditCard className="h-4 w-4" />
                      <span>
                        {purchaseStep === 1 ? 'Continue' : purchaseStep === 2 ? 'Review & Pay' : 'Complete Purchase'}
                      </span>
                    </button>
                  </div>
                </form>
              </div>
            </div>
          </div>
        )}

        {/* New Claim Modal */}
        {showClaimModal && (
          <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-60">
            <div className="bg-white rounded-2xl max-w-md w-full p-8 relative shadow-2xl">
              <button
                onClick={() => setShowClaimModal(false)}
                className="absolute top-4 right-4 text-gray-400 hover:text-blue-600 transition-colors"
              >
                <X className="h-6 w-6" />
              </button>
              
              <h2 className="text-2xl font-bold bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent mb-6">
                File New Claim
              </h2>
              
              <form onSubmit={handleClaimSubmit} className="space-y-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Claim Type</label>
                  <select
                    value={newClaim.type}
                    onChange={(e) => setNewClaim({...newClaim, type: e.target.value})}
                    className="w-full px-4 py-3 border-2 border-blue-200 rounded-full focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all"
                    required
                  >
                    <option value="">Select claim type</option>
                    <option value="Medical Emergency">Medical Emergency</option>
                    <option value="Trip Cancellation">Trip Cancellation</option>
                    <option value="Flight Delay">Flight Delay</option>
                    <option value="Lost Baggage">Lost Baggage</option>
                    <option value="Trip Interruption">Trip Interruption</option>
                  </select>
                </div>
                
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Claim Amount ($)</label>
                  <input
                    type="number"
                    value={newClaim.amount}
                    onChange={(e) => setNewClaim({...newClaim, amount: parseInt(e.target.value)})}
                    className="w-full px-4 py-3 border-2 border-blue-200 rounded-full focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all"
                    placeholder="Enter claim amount"
                    required
                  />
                </div>
                
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Incident Date</label>
                  <input
                    type="date"
                    value={newClaim.incidentDate}
                    onChange={(e) => setNewClaim({...newClaim, incidentDate: e.target.value})}
                    className="w-full px-4 py-3 border-2 border-blue-200 rounded-full focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all"
                    required
                  />
                </div>
                
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Description</label>
                  <textarea
                    rows={4}
                    value={newClaim.description}
                    onChange={(e) => setNewClaim({...newClaim, description: e.target.value})}
                    className="w-full px-4 py-3 border-2 border-blue-200 rounded-2xl focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all"
                    placeholder="Describe the incident in detail"
                    required
                  ></textarea>
                </div>
                
                <button
                  type="submit"
                  className="w-full bg-gradient-to-r from-green-500 to-emerald-600 text-white py-3 rounded-full hover:from-green-600 hover:to-emerald-700 transition-all transform hover:scale-105 font-semibold shadow-lg"
                >
                  Submit Claim
                </button>
              </form>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};